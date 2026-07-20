const fs = require('node:fs');
const path = require('node:path');

function loadEnvFile(filePath) {
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

function loadBackendEnv() {
  loadEnvFile(path.join(__dirname, '..', '..', '.env'));
}

function getServerConfig() {
  return {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT || 3000),
  };
}

module.exports = {
  getServerConfig,
  loadBackendEnv,
};
