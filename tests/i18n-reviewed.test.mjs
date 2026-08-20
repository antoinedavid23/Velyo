import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Italian is the default public language and English and French remain available", async () => {
  const locale = await source("components/LocaleController.tsx");
  assert.match(locale, /locale:\s*"it"/);
  assert.match(locale, /PUBLIC_LOCALES\s*=\s*\["it",\s*"en",\s*"fr"\]/);
  assert.match(locale, /velyo-locale/);
});

test("key public files expose Velyo without leaking the former brand", async () => {
  const files = [
    "app/page.tsx",
    "app/layout.tsx",
    "components/SiteShell.tsx",
    "app/servizi/page.tsx",
    "app/esperienze/page.tsx",
    "app/proprietari/page.tsx",
    "app/chi-siamo/page.tsx",
    "app/contatti/page.tsx",
  ];
  const contents = await Promise.all(files.map(source));
  for (const content of contents) assert.doesNotMatch(content, /aurevia/i);
  assert.match(contents.join("\n"), /velyo/i);
});
