import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const trackedFiles = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((path) => !path.startsWith('docs/test/') && !path.startsWith('docs/tickets/'));

const secretLike = /(?:^|_)(?:SECRET|TOKEN|PASSWORD|PRIVATE_KEY|ACCESS_KEY|API_KEY|WEBHOOK)(?:$|_)/;
const names = new Set();

for (const path of trackedFiles) {
  const text = readFileSync(path, 'utf8');
  for (const match of text.matchAll(/\b(VITE_[A-Z][A-Z0-9_]*)\b/g)) names.add(match[1]);
}

const unsafe = [...names].filter((name) => secretLike.test(name)).sort();
if (unsafe.length > 0) {
  throw new Error(
    `Secret-like Vite variables are forbidden because browser bundles are public: ${unsafe.join(', ')}`,
  );
}

console.log(`Public browser configuration check passed for ${names.size} VITE_* names.`);
