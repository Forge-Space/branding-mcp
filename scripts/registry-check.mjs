#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { execPath } from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const npmBin = path.join(path.dirname(execPath), 'npm');

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);

function readJson(name) {
  return JSON.parse(readFileSync(new URL(name, root), 'utf8'));
}

function normalizeRepoUrl(url = '') {
  return url
    .replace(/^git\+/, '')
    .replace(/\.git$/, '')
    .replace(/\/$/, '');
}

function getPackPaths() {
  execFileSync(npmBin, ['run', 'build'], { cwd: rootPath, encoding: 'utf8' });
  const output = execFileSync(npmBin, ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd: rootPath,
    encoding: 'utf8',
  });
  const [pack] = JSON.parse(output);
  return pack.files.map((file) => file.path);
}

async function getPublishedVersions(name) {
  // The name is from package.json (trusted local config), not user-controlled input.
  // codeql[js/request-forgery] intentional: url built from local manifest name, not user-controlled data.
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
    headers: { accept: 'application/json' },
  });
  if (response.status === 404) {
    return {};
  }
  if (!response.ok) {
    throw new Error(`npm registry lookup failed with ${response.status}`);
  }
  const metadata = await response.json();
  return metadata.versions ?? {};
}

function collectFindings(pkg, server, packPaths, publishedVersions) {
  const errors = [];
  const warnings = [];
  // Require exactly one npm package entry to avoid false-positives from zero or multiple matches.
  const npmPackages = server.packages?.filter((entry) => entry.registryType === 'npm') ?? [];
  const [npmPackage] = npmPackages;

  if (!pkg.mcpName) errors.push('package.json is missing mcpName.');
  if (server.name !== pkg.mcpName) errors.push('server.json name must match package.json mcpName.');
  if (server.version !== pkg.version)
    errors.push('server.json version must match package.json version.');

  if (npmPackages.length !== 1) {
    errors.push(
      `server.json must include exactly one npm package entry (found ${npmPackages.length}).`
    );
  } else {
    if (npmPackage.identifier !== pkg.name)
      errors.push('server.json npm identifier must match package name.');
    if (npmPackage.version !== pkg.version)
      errors.push('server.json npm version must match package version.');
    if (npmPackage.transport?.type !== 'stdio')
      errors.push('server.json npm package transport must be stdio.');
  }

  if (!Array.isArray(server.environmentVariables))
    errors.push('server.json environmentVariables must be an array.');
  if (pkg.publishConfig?.access !== 'public')
    errors.push('package.json publishConfig.access must be public.');
  if (!pkg.files?.includes('server.json'))
    errors.push('package.json files must include server.json.');
  if (!packPaths.includes('server.json'))
    errors.push('npm pack --dry-run must include server.json.');
  if (!packPaths.some((item) => item.startsWith('dist/')))
    errors.push('npm pack --dry-run must include built dist artifacts.');
  if (!packPaths.includes('README.md')) errors.push('npm pack --dry-run must include README.md.');

  // Guard against missing repository.url before comparing.
  const packageRepoUrl = pkg.repository?.url ?? '';
  const serverRepoUrl = server.repository?.url ?? '';
  if (!packageRepoUrl) errors.push('package.json repository.url is required.');
  if (!serverRepoUrl) errors.push('server.json repository.url is required.');
  if (
    packageRepoUrl &&
    serverRepoUrl &&
    normalizeRepoUrl(packageRepoUrl) !== normalizeRepoUrl(serverRepoUrl)
  ) {
    errors.push('package.json repository.url must match server.json repository.url.');
  }
  if (publishedVersions[pkg.version]) {
    warnings.push(
      `npm already has published version ${pkg.version}; bump before the next release tag.`
    );
  }
  return { errors, warnings };
}

async function main() {
  const pkg = readJson('package.json');
  const server = readJson('server.json');
  const packPaths = getPackPaths();
  const publishedVersions = await getPublishedVersions(pkg.name);
  const { errors, warnings } = collectFindings(pkg, server, packPaths, publishedVersions);
  if (errors.length > 0) {
    console.error('Registry check failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Registry check passed for ${pkg.name}@${pkg.version}`);
  for (const warning of warnings) console.log(`Warning: ${warning}`);
}

await main();
