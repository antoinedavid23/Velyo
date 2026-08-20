import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("the homepage uses the Velyo concierge structure without a video hero", async () => {
  const home = await source("app/page.tsx");
  assert.match(home, /velyo-trust-strip/);
  assert.match(home, /owner-welcome/);
  assert.match(home, /home-services/);
  assert.match(home, /velyo-simulator-teaser/);
  assert.match(home, /experience-mosaic/);
  assert.match(home, /concierge-voices/);
  assert.match(home, /MethodJourney/);
  assert.match(home, /ReviewCards/);
  assert.match(home, /images\/concierge\/genova-blue-hour-premium\.png/);
  assert.doesNotMatch(home, /home-properties|properties\.slice\(0, 3\)/);
  assert.doesNotMatch(home, /estimate-premium/);
  assert.doesNotMatch(home, /HeroVideo|<video|\.mp4|\.webm/);
});

test("the public navigation points to separate routes", async () => {
  const shell = await source("components/SiteShell.tsx");
  for (const route of ["/servizi", "/esperienze", "/proprietari", "/proprieta", "/simulatore", "/chi-siamo", "/contatti"]) {
    assert.match(shell, new RegExp(route.replace("/", "\\/")));
  }
});

test("Velyo branding and Genova imagery are configured", async () => {
  const [layout, data, css] = await Promise.all([
    source("app/layout.tsx"),
    source("data/content.ts"),
    source("app/velyo.css"),
  ]);
  assert.match(layout, /Velyo Property Manager/);
  assert.match(data, /Genova/);
  assert.match(css, /--velyo-blue/);
  assert.doesNotMatch(css, /#C9A24B/i);
});

test("public forms use schema validation without stale variant branches", async () => {
  const [contactForm, valuationForm] = await Promise.all([
    source("components/LeadForm.tsx"),
    source("components/ValuationForm.tsx"),
  ]);
  for (const form of [contactForm, valuationForm]) {
    assert.match(form, /useForm/);
    assert.match(form, /zodResolver/);
    assert.match(form, /website/);
    assert.match(form, /consent/);
  }
  assert.doesNotMatch(contactForm, /kind\s*===/);
});
