import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFile(filePath: string): void {
  if (!fs.existsSync(filePath)) return;

  const contents = fs.readFileSync(filePath, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function loadBackendEnv(): void {
  loadEnvFile(path.join(currentDir, '..', '..', '.env'));
}

export function getServerConfig(): { host: string; port: number } {
  return {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT || 3000),
  };
}
