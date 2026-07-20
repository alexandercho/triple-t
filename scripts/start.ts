const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

const children = [
  spawn('pnpm', ['--dir', 'backend', 'dev'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  }),
  spawn('pnpm', ['--dir', 'frontend', 'start'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  }),
];

let shuttingDown = false;

function shutdown(signal: string): void {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

for (const child of children) {
  child.on('exit', (code: number | null, signal: string | null) => {
    if (shuttingDown) return;
    if (signal || code !== 0) {
      shutdown(signal || 'SIGTERM');
      process.exit(code ?? 1);
    }
  });
}
