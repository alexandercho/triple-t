const { spawn } = require('node:child_process');
const fs = require('node:fs/promises');
const net = require('node:net');
const path = require('node:path');
const { createInterface } = require('node:readline/promises');
const { setTimeout: delay } = require('node:timers/promises');

const root = path.resolve(__dirname, '..');
const sourceName = 'triple-t';
const projectNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function run(command: string, args: string[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: 'inherit',
      env: process.env,
    });

    child.on('error', reject);
    child.on('exit', (code: number | null, signal: string | null) => {
      if (signal) {
        reject(new Error(`${command} ${args.join(' ')} exited with signal ${signal}`));
        return;
      }

      if (code !== 0) {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
        return;
      }

      resolve();
    });
  });
}

async function waitForPort(host: string, port: number, timeoutMs = 30_000): Promise<void> {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const isReady = await new Promise<boolean>((resolve) => {
      const socket = net.createConnection({ host, port });

      socket.setTimeout(1_000);
      socket.on('connect', () => {
        socket.end();
        resolve(true);
      });
      socket.on('timeout', () => {
        socket.destroy();
        resolve(false);
      });
      socket.on('error', () => {
        resolve(false);
      });
    });

    if (isReady) return;
    await delay(1_000);
  }

  throw new Error(`Timed out waiting for ${host}:${port} to become ready`);
}

async function promptForProjectName(): Promise<string> {
  const input = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    while (true) {
      const answer = await input.question('Project name (kebab-case alphanumeric): ');
      const projectName = answer.trim();

      if (!projectNamePattern.test(projectName)) {
        console.log('Please use only lowercase letters, numbers, and single hyphens between words.');
        continue;
      }

      return projectName;
    }
  } finally {
    input.close();
  }
}

async function collectFiles(dir: string, files: string[] = []): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') {
        continue;
      }

      await collectFiles(path.join(dir, entry.name), files);
      continue;
    }

    if (entry.isFile()) {
      files.push(path.join(dir, entry.name));
    }
  }

  return files;
}

async function replaceProjectName(projectName: string): Promise<void> {
  if (projectName === sourceName) {
    console.log('Project name already matches the current repository name; skipping replacement.');
    return;
  }

  const files = await collectFiles(root);

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file);

      if (content.includes(0)) {
        return;
      }

      const text = content.toString('utf8');
      if (!text.includes(sourceName)) {
        return;
      }

      const updated = text.split(sourceName).join(projectName);
      await fs.writeFile(file, updated);
    })
  );
}

async function setup(): Promise<void> {
  const projectName = await promptForProjectName();
  await replaceProjectName(projectName);

  await Promise.all([
    run('pnpm', ['--dir', 'backend', 'install']),
    run('pnpm', ['--dir', 'frontend', 'install']),
  ]);
  await run('docker', ['compose', '-f', 'backend/docker-compose.yml', 'up', '-d']);
  await waitForPort('127.0.0.1', 5432);
  await run('pnpm', ['--dir', 'backend', 'prisma:generate']);
  await run('pnpm', ['--dir', 'backend', 'prisma:migrate']);
}

setup().catch((error) => {
  console.error(error);
  process.exit(1);
});
