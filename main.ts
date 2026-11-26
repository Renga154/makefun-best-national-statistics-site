// A working best-site-01 entry (Node 22, standard library only): the site is this directory's app/ folder, plain
// static files a browser opens at app/index.html (ES modules, CSS, no build step), its content held in its own files:
// nothing it runs, styles or shows loads over the network. The program hands it in: it copies app/ and screenshots/
// from beside this file to /output and writes /output/dossier.json, the summary the judge reads (your screenshots, the
// first load's files and bytes, and your source), with the vendored make.fun library. Leave vendor/makefun-frontend.ts
// as it is: the scorer requires dossier.json to be byte for byte what its own copy writes.
//
// A starting point, not a winner: a plain recipe collection, a list of recipes and a page for each. Build the site the
// brief asks for in app/ (its content, ease of use, a phone layout, its look), put 3 or 4 PNG or JPEG screenshots of
// it running in screenshots/ (the first by name is the cover; one may be a 390 x 844 phone view; shots.json says which
// views this starter's were taken of), and run it.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier, DOSSIER_SCHEMA } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const screenshotCaps = { max: 4, max_bytes: 256 * 1024 };
const pages = ['index.html', 'population.html', 'economy.html', 'prefectures.html', 'society.html'];

function validateEntry() {
  const app = join(here, 'app');
  const localOrigin = 'https://entry.invalid';
  const referencedFiles = new Set<string>();

  for (const page of pages) {
    const file = join(app, page);
    if (!statSync(file, { throwIfNoEntry: false })?.isFile()) {
      throw new Error(`required page app/${page} is missing or is not a file`);
    }
    const html = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
      for (const [, doubleQuoted, singleQuoted, bare] of tag[0].matchAll(
        /\s(?:href|src|poster|data)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>\x60]+))/gi,
      )) {
        const reference = (doubleQuoted ?? singleQuoted ?? bare).trim();
        if (!reference || reference.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) continue;
        const url = new URL(reference, `${localOrigin}/${page}`);
        let target = decodeURIComponent(url.pathname);
        if (target.endsWith('/')) target += 'index.html';
        if (!statSync(join(app, target), { throwIfNoEntry: false })?.isFile()) {
          throw new Error(`app/${page} references "${reference}", but app${target} is missing or is not a file`);
        }
        referencedFiles.add(target);
      }
    }
  }

  const screenshots = join(here, 'screenshots');
  const entries = existsSync(screenshots) ? readdirSync(screenshots, { withFileTypes: true }) : [];
  if (entries.length > screenshotCaps.max) {
    throw new Error(`screenshots/ contains ${entries.length} entries, exceeding the limit of ${screenshotCaps.max}`);
  }
  for (const entry of entries) {
    if (!entry.isFile()) throw new Error(`screenshots/${entry.name} is not a regular file`);
    const { size } = statSync(join(screenshots, entry.name));
    if (size > screenshotCaps.max_bytes) {
      throw new Error(`screenshots/${entry.name} is ${size} bytes, exceeding the limit of ${screenshotCaps.max_bytes} bytes (256 KiB)`);
    }
  }

  console.log(`Preflight passed: ${pages.length} pages, ${referencedFiles.size} distinct local targets, ${entries.length} screenshot files within caps.`);
}

try {
  validateEntry();
} catch (error) {
  console.error(`Preflight failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files and directories in app/ or
// 16 MiB of app files: app/ counts beside /output's own 1000-entry cap, its screenshots/ and dossier.json).
const dossierPath = join(out, 'dossier.json');
writeFileSync(
  dossierPath,
  buildDossier(out, { text_max_bytes: 163840, screenshots: screenshotCaps, app_max_files: 993, app_max_bytes: 16777216 }),
);

function listOutputFiles(directory: string): number {
  const entries = readdirSync(join(out, directory), { withFileTypes: true })
    .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  let count = 0;
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      count += listOutputFiles(path);
    } else if (entry.isFile()) {
      console.log(`  ${path}  ${statSync(join(out, path)).size} bytes`);
      count++;
    }
  }
  return count;
}

try {
  const dossier = JSON.parse(readFileSync(dossierPath, 'utf8'));
  if (dossier?.schema !== DOSSIER_SCHEMA) {
    throw new Error(`${dossierPath} must have schema "${DOSSIER_SCHEMA}"`);
  }
  const appFiles = listOutputFiles('app');
  const screenshots = listOutputFiles('screenshots');
  console.log(`Output verified: ${dossierPath} (${DOSSIER_SCHEMA}), ${appFiles} app files, ${screenshots} screenshot files.`);
} catch (error) {
  console.error(`Output verification failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
