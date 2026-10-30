#!/usr/bin/env node
// Flatten the wireframe (this repo) with an optional brand layer into one complete design system.
//
//   node scripts/flatten.mjs                              -> dist/ for the wireframe on its own
//   node scripts/flatten.mjs --brand brand.json --out dist -> wireframe + brand, two colour modes
//   ... --detach                                          -> brand only, one colour mode, no link back
//
// Output folder: tokens.json (complete, every token), tokens.css, README.md, fonts/, components/.
// With a brand, README.md = the brand's README.md (next to brand.json, or --readme) followed by
// this repo's shared rules (everything after the shared-rules marker in README.md).

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const baseDir = resolve(here, "..");
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const brandPath = opt("--brand");
const outDir = resolve(opt("--out") ?? "dist");
const detach = args.includes("--detach");
const readmeArg = opt("--readme");

const base = JSON.parse(readFileSync(join(baseDir, "tokens.json"), "utf8"));
const basePkg = JSON.parse(readFileSync(join(baseDir, "package.json"), "utf8"));
const brand = brandPath ? JSON.parse(readFileSync(resolve(brandPath), "utf8")) : null;

// ---- merge -----------------------------------------------------------------
const byName = (list) => new Map((list ?? []).map((t) => [t.name, t]));

function mergeList(baseList, brandList, label = "") {
  const over = byName(brandList);
  const merged = baseList.map((t) => {
    if (!over.has(t.name)) return t;
    const o = over.get(t.name);
    const m = { ...t, ...o };
    if ("value" in o && !("ref" in o)) delete m.ref; // an exact value replaces the role's pointer
    if (label && t.usage && !t.usage.startsWith(label)) m.usage = label + t.usage;
    return m;
  });
  for (const t of brandList ?? []) if (!baseList.some((b) => b.name === t.name)) merged.push(t);
  return merged;
}

const out = structuredClone(base);
out.version = 1;

if (brand) {
  out.name = brand.name ?? out.name;
  out.prefix = brand.prefix ?? out.prefix;
  const overrides = byName(brand.color?.tokens);
  const label = (brand.name ?? "Brand").replace(/ Design System$/, "") + " override. ";
  const mark = (t) => (t.usage && !t.usage.startsWith(label) ? { usage: label + t.usage } : { usage: label.trim() });
  if (detach) {
    out.color.themes = [{ id: "branded", name: "Branded mode" }];
    out.color.tokens = base.color.tokens.map((t) =>
      overrides.has(t.name) ? { ...t, value: overrides.get(t.name).value } : t,
    );
  } else {
    out.color.themes = [
      { id: "wireframe", name: "Wireframe mode" },
      { id: "branded", name: "Branded mode" },
    ];
    out.color.tokens = base.color.tokens.map((t) =>
      overrides.has(t.name)
        ? { ...t, value: { wireframe: t.value, branded: overrides.get(t.name).value }, ...mark(t) }
        : t,
    );
  }
  for (const t of brand.color?.tokens ?? [])
    if (!base.color.tokens.some((b) => b.name === t.name)) out.color.tokens.push(t);

  const LEGACY_KEYS = { radiusPrimitives: "radius", radiusRole: "radiusRoles" }; // older group names
  for (let [key, fam] of Object.entries(brand)) {
    if (["name", "extends", "note", "color", "type"].includes(key)) continue;
    key = LEGACY_KEYS[key] ?? key;
    if (fam && Array.isArray(fam.tokens)) {
      out[key] = { ...(out[key] ?? {}), tokens: mergeList(out[key]?.tokens ?? [], fam.tokens, detach ? "" : label) };
    }
  }
  if (brand.type) {
    if (brand.type.families) out.type.families = { ...out.type.families, ...brand.type.families };
    if (brand.type.fonts) out.type.fonts = brand.type.fonts;
    for (const g of brand.type.groups ?? []) {
      const target = out.type.groups.find((x) => x.name === g.name);
      if (target) target.styles = mergeList(target.styles, g.styles);
      else out.type.groups.push(g);
    }
  }
  out.meta = detach
    ? { brand: brand.name, detached: true, builtAt: new Date().toISOString() }
    : { builtFrom: `${basePkg.name}@${basePkg.version}`, brand: brand.name, detached: false, builtAt: new Date().toISOString() };
} else {
  out.meta = { builtFrom: `${basePkg.name}@${basePkg.version}`, builtAt: new Date().toISOString() };
}

// ---- roles: a token with "ref" takes its value from the primitive it points at ----
const allTokens = new Map();
for (const [key, fam] of Object.entries(out)) {
  if (key === "color" || key === "type" || !fam?.tokens) continue;
  for (const t of fam.tokens) allTokens.set(t.name, t);
}
const POINTS = / (Points to [\w-]+|Set to [^ ]+)\.$/;
for (const t of allTokens.values()) {
  const isRole = t.ref || POINTS.test(t.usage ?? "");
  if (!isRole) continue;
  if (t.ref) {
    const target = allTokens.get(t.ref);
    if (!target) throw new Error(`${t.name} points at ${t.ref}, which does not exist`);
    t.value = target.value;
  }
  const base = (t.usage ?? "").replace(POINTS, "");
  t.usage = `${base} ${t.ref ? `Points to ${t.ref}` : `Set to ${t.value}`}.`.trim();
}

// ---- css -------------------------------------------------------------------
const cssVal = (v) => (typeof v === "string" && /^\{.+\}$/.test(v) ? `var(--${v.slice(1, -1)})` : v);
const themes = out.color.themes.map((t) => t.id);
const valueFor = (tok, theme) =>
  typeof tok.value === "string" ? tok.value : tok.value[theme] ?? tok.value[themes[0]];

const lines = [`/* ${out.name}: generated from tokens.json. Do not edit by hand. */`, ""];
for (const f of out.type.fonts ?? []) {
  lines.push(
    "@font-face {",
    `  font-family: "${f.family}";`,
    `  src: url("${f.file}") format("woff2");`,
    `  font-weight: ${f.weight ?? "400"};`,
    `  font-style: ${f.style ?? "normal"};`,
    "  font-display: swap;",
    "}",
  );
}
themes.forEach((theme, i) => {
  const sel = i === 0 ? `:root, [data-theme="${theme}"]` : `[data-theme="${theme}"]`;
  lines.push("", `${sel} {`);
  for (const tok of out.color.tokens) {
    // later modes re-declare what changes, plus every alias, so roles follow the mode on any element
    if (i > 0 && typeof tok.value === "string" && !/^\{.+\}$/.test(tok.value)) continue;
    lines.push(`  --${tok.name}: ${cssVal(valueFor(tok, theme))};`);
  }
  if (i === 0) for (const tok of out.shadow?.tokens ?? []) lines.push(`  --${tok.name}: ${tok.value};`);
  lines.push("}");
});
lines.push("", ":root {");
for (const [key, fam] of Object.entries(out.type.families)) lines.push(`  --font-${key}: ${fam};`);
for (const [key, fam] of Object.entries(out)) {
  if (["color", "type", "shadow", "meta"].includes(key) || !fam?.tokens) continue;
  for (const tok of fam.tokens) lines.push(`  --${tok.name}: ${tok.ref ? `var(--${tok.ref})` : tok.value};`);
}
lines.push("}");
for (const g of out.type.groups) {
  for (const s of g.styles) {
    lines.push(
      "",
      `.${s.name} {`,
      `  font-family: var(--font-${s.family || g.family});`,
      `  font-size: ${s.fontSize};`,
      `  line-height: ${s.lineHeight};`,
      `  font-weight: ${s.fontWeight};`,
      "}",
    );
  }
}

// ---- write -----------------------------------------------------------------
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "tokens.json"), JSON.stringify(out, null, 2) + "\n");
writeFileSync(join(outDir, "tokens.css"), lines.join("\n") + "\n");
const baseReadme = readFileSync(join(baseDir, "README.md"), "utf8");
let readme = baseReadme;
if (brand) {
  const marker = baseReadme.indexOf("<!-- shared-rules");
  const shared = marker === -1 ? "" : baseReadme.slice(baseReadme.indexOf("\n", marker) + 1);
  const brandReadmePath = readmeArg ? resolve(readmeArg) : join(dirname(resolve(brandPath)), "README.md");
  const brandReadme = existsSync(brandReadmePath) ? readFileSync(brandReadmePath, "utf8").trimEnd() : `# ${out.name}`;
  readme = `${brandReadme}\n\n${shared}`;
  if (detach) {
    // A handover copy stands alone: no inheritance, levers or workflow, only what the client needs.
    const date = new Date().toISOString().slice(0, 10);
    readme =
      `# ${out.name}\n\n` +
      `A standalone design system, delivered ${date}. Everything it needs is in this folder: ` +
      "`tokens.json` (every token), `tokens.css` (load it with a `<link>`), `fonts/` and `components/`.\n\n" +
      "- **Use a token wherever one exists.** Change values in `tokens.json`, then regenerate `tokens.css`, or edit `tokens.css` directly and keep the two in step.\n" +
      "- **Fonts** are included as files under the SIL Open Font License; no external font service is needed.\n" +
      "- **Components** (`components/bundle.js`, `bundle.css`) need React 18 on the page; each component's README explains its use.\n\n" +
      shared;
  }
}
writeFileSync(join(outDir, "README.md"), readme);
for (const dir of ["fonts", "components"]) {
  if (existsSync(join(baseDir, dir))) cpSync(join(baseDir, dir), join(outDir, dir), { recursive: true });
}
console.log(
  `${out.name}: ${out.color.tokens.length} colours, ${themes.length} mode(s)` +
    (brand ? `, from ${out.meta.builtFrom}${detach ? ", detached" : ""}` : "") +
    ` -> ${outDir}`,
);
