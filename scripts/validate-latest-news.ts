import { LATEST_AI_NEWS } from "../src/lib/newsLatestData";

const ids = new Set<string>();
const errors: string[] = [];

for (const item of LATEST_AI_NEWS) {
  if (ids.has(item.id)) errors.push(`duplicate id: ${item.id}`);
  ids.add(item.id);
  if (!/^https:\/\//.test(item.url ?? "")) errors.push(`invalid URL: ${item.id}`);
  if (item.dateNum !== 202606) errors.push(`unexpected month: ${item.id}`);
  if (!item.dateDay || item.dateDay < 19 || item.dateDay > 23) errors.push(`unexpected day: ${item.id}`);
  if (!item.summary.trim()) errors.push(`missing summary: ${item.id}`);
  if (!item.why_it_matters?.trim()) errors.push(`missing why_it_matters: ${item.id}`);
  if (!item.what_to_try?.trim()) errors.push(`missing what_to_try: ${item.id}`);
}

if (LATEST_AI_NEWS.length !== 30) errors.push(`expected 30 items, found ${LATEST_AI_NEWS.length}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Reviewed news checks passed: ${LATEST_AI_NEWS.length} unique items.`);
