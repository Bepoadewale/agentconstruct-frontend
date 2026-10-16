import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}

await walk(root.pathname);
const names = files.map((file) => relative(root.pathname, file));
const forbidden = names.filter((name) =>
  /(^|\/)(functions|api)(\/|$)|_worker\.js$|wrangler|server\.(js|mjs|cjs)$|404\.html$/i.test(name),
);
if (!names.includes('index.html')) throw new Error('dist/index.html is missing.');
if (forbidden.length)
  throw new Error(`Cloudflare runtime or SPA-conflicting files found: ${forbidden.join(', ')}`);
if (files.length > 20_000)
  throw new Error(`Static file count ${files.length} exceeds the Pages Free limit.`);

let largest = { name: '', size: 0 };
for (const file of files) {
  const details = await stat(file);
  if (details.size > largest.size)
    largest = { name: relative(root.pathname, file), size: details.size };
  if (details.size > 25 * 1024 * 1024)
    throw new Error(`${relative(root.pathname, file)} exceeds 25 MiB.`);
}

const searchable = await Promise.all(
  files
    .filter((file) => /\.(js|css|html|json|txt|map)$/i.test(file))
    .map((file) => readFile(file, 'utf8')),
);
const bundle = searchable.join('\n');
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/,
  /gh[pousr]_[A-Za-z0-9_]{20,}/,
  /(?:client_secret|aws_secret_access_key)\s*[=:]\s*["'][^"']+/i,
];
for (const pattern of secretPatterns) {
  if (pattern.test(bundle))
    throw new Error(`Potential credential pattern found in static output: ${pattern}`);
}

if (/node:fs|node:http|express|fastify|__dirname/.test(bundle)) {
  throw new Error('A server-side Node.js runtime marker was found in the browser output.');
}

console.log(
  JSON.stringify({
    static_files: files.length,
    largest_asset: largest.name,
    largest_asset_bytes: largest.size,
    cloudflare_functions: false,
    worker_runtime: false,
    top_level_404: false,
    secret_patterns: 'none',
  }),
);
