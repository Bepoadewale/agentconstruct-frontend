import { spawn } from 'node:child_process';

const port = 4187;
const child = spawn(
  process.execPath,
  [
    './node_modules/vite/bin/vite.js',
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    String(port),
    '--strictPort',
  ],
  {
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);
let output = '';
child.stdout.on('data', (chunk) => {
  output += chunk;
});
child.stderr.on('data', (chunk) => {
  output += chunk;
});

try {
  let response;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      response = await fetch(`http://127.0.0.1:${port}/plans/refresh-contract`);
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  if (!response?.ok)
    throw new Error(
      `Nested route did not resolve: ${response?.status ?? 'no response'}\n${output}`,
    );
  const body = await response.text();
  if (!body.includes('<div id="root"></div>'))
    throw new Error('Nested route did not return the SPA shell.');
  console.log('Nested SPA route refresh returned the static application shell.');
} finally {
  child.kill('SIGTERM');
}
