import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const prNumber = process.env.GITHUB_PR_NUMBER ?? process.env.PR_NUMBER;
const eventName = process.env.GITHUB_EVENT_NAME;

if (eventName !== 'pull_request' || !prNumber) {
  console.log('PR evidence check skipped outside a pull request.');
  process.exit(0);
}

if (!/^[1-9][0-9]*$/.test(prNumber)) {
  throw new Error(`Invalid pull request number: ${prNumber}`);
}

const requiredFiles = [`docs/tickets/ticket${prNumber}.md`, `docs/test/test${prNumber}.md`];

for (const relativePath of requiredFiles) {
  const path = resolve(relativePath);
  if (!existsSync(path)) {
    throw new Error(`Pull request #${prNumber} must include ${relativePath}`);
  }
}

const ticket = readFileSync(resolve(requiredFiles[0]), 'utf8');
const requiredTicketSections = [
  '## Problem / goal',
  '## Current repo state',
  '## Research / references used',
  '## Work planned for the PR',
  '## Acceptance criteria',
  '## Acceptance status',
  '## Tests / validation performed',
  '## Evidence files produced',
  '## Boundaries',
  '## Follow-up work',
];

for (const section of requiredTicketSections) {
  if (!ticket.includes(section)) {
    throw new Error(`${requiredFiles[0]} is missing ${section}`);
  }
}

const evidence = readFileSync(resolve(requiredFiles[1]), 'utf8');
const requiredEvidenceSections = [
  '## Commands executed',
  '## Result',
  '## Execution boundary',
  '## Known limitations',
];

for (const section of requiredEvidenceSections) {
  if (!evidence.includes(section)) {
    throw new Error(`${requiredFiles[1]} is missing ${section}`);
  }
}

console.log(`PR #${prNumber} ticket and test evidence are present.`);
