#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";

const root = new URL("../", import.meta.url);

const requiredFiles = [
  "package.json",
  "README.md",
  "PRIVACY.md",
  "templates/local-seo-audit-dashboard.md",
  "data/audit-checklist.csv",
  "data/campaign-tracker.csv",
  "data/lead-follow-up.csv"
];

const expectedHeaders = new Map([
  ["data/audit-checklist.csv", "Section,Check,Severity,Status,Owner,Notes"],
  ["data/campaign-tracker.csv", "Campaign,Status,Destination URL,Final URL,UTM Source,UTM Medium,UTM Campaign,UTM Term,UTM Content,Owner,Notes"],
  ["data/lead-follow-up.csv", "Lead,Business,Contact,Phone,Email,Landing Page,Source,Campaign,Status,Next Follow-Up,Outcome,Notes"]
]);

const bannedPatterns = [
  /<script\b/i,
  /iframe/i,
  /api[_-]?key\s*[=:]/i,
  /secret\s*[=:]/i,
  /token\s*[=:]/i,
  /fetch\s*\(/i,
  /XMLHttpRequest/i,
  /sendBeacon/i
];

const errors = [];
const contents = new Map();

for (const file of requiredFiles) {
  const content = await readText(file);
  contents.set(file, content);
  if (!content.trim()) errors.push(`${file} must not be empty`);
}

const packageJson = JSON.parse(contents.get("package.json"));
if (packageJson.private !== true) errors.push("package.json must stay private until publishing path is final");
if (!packageJson.scripts?.check || !packageJson.scripts?.smoke) errors.push("package.json must define check and smoke scripts");

for (const [file, expectedHeader] of expectedHeaders) {
  const firstLine = contents.get(file).split(/\r?\n/)[0];
  if (firstLine !== expectedHeader) errors.push(`${file} header mismatch`);
}

const dashboard = contents.get("templates/local-seo-audit-dashboard.md");
for (const token of ["Landing Page QA", "Campaign URLs", "Lead Follow-Up", "Weekly Review"]) {
  if (!dashboard.includes(token)) errors.push(`Dashboard missing section: ${token}`);
}

for (const [file, content] of contents) {
  for (const pattern of bannedPatterns) {
    if (pattern.test(content)) errors.push(`${file} contains banned pattern ${pattern}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`notion local seo audit kit ok${process.argv.includes("--smoke") ? " smoke" : ""}`);

async function readText(file) {
  return readFile(path.join(fileURLToPath(root), file), "utf8");
}

function fileURLToPath(url) {
  return decodeURIComponent(url.pathname);
}
