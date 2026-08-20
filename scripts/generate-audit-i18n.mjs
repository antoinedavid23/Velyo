import fs from "node:fs";

const lines = fs.readFileSync("i18n-audit-output.txt", "utf8").split(/\r?\n/);
const sources = [...new Set(lines.map((line) => line.split("\t").slice(2).join("\t").trim()).filter(Boolean).filter((value) => !value.startsWith("MISSING ")))];

async function translateText(text, language) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "fr");
  url.searchParams.set("tl", language);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation request failed: ${response.status}`);
  const payload = await response.json();
  return payload[0].map((part) => part[0]).join("").trim();
}

async function translateBatch(batch, language) {
  const tagged = batch.map((value, index) => `[VELYO_${String(index).padStart(4, "0")}] ${value}`).join("\n");
  const translated = await translateText(tagged, language);
  const matches = [...translated.matchAll(/\[VELYO_(\d{4})\]\s*/g)];
  if (matches.length === batch.length) return matches.map((match, index) => translated.slice(match.index + match[0].length, matches[index + 1]?.index ?? translated.length).trim());
  return Promise.all(batch.map((value) => translateText(value, language)));
}

function batches(values, limit = 3200) {
  const result = []; let current = []; let size = 0;
  for (const value of values) {
    if (current.length && size + value.length > limit) { result.push(current); current = []; size = 0; }
    current.push(value); size += value.length + 30;
  }
  if (current.length) result.push(current);
  return result;
}

const output = Object.fromEntries(sources.map((source) => [source, {}]));
for (const [locale, language] of [["it", "it"], ["en", "en"]]) {
  for (const batch of batches(sources)) {
    const translated = await translateBatch(batch, language);
    translated.forEach((value, index) => { output[batch[index]][locale] = value; });
  }
  console.log(`${locale}: ${sources.length}`);
}

fs.writeFileSync("lib/i18n-audit-complete.ts", `// Exhaustive public-copy coverage generated from scripts/i18n-audit.cjs.\nexport const auditCompleteMessages: Record<string, { it: string; en: string }> = ${JSON.stringify(output, null, 2)};\n`, "utf8");
