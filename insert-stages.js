import { getTableArtifact, insertDifference } from './util.js';

import { tableland } from "./tableland.js";

const columns = [
  'generation_id',
  'parent_stage_id'
];

const FIRST_GEN = 1; // KIPPAN 0001
const data = [
  [FIRST_GEN, null], // Stage 0 - ex, Gem
  [FIRST_GEN, 1], // Stage 1 - ex, Ghost
  [FIRST_GEN, 2], // Stage 2 - ex, Choku
  [FIRST_GEN, 3], // Stage 3 - ex, Lion
];

const tableArtifact = await getTableArtifact('Stages');
const { name: tableName } = tableArtifact;
const result = await tableland.read(`SELECT * FROM ${tableName};`);
await insertDifference(tableName, result.rows, columns, data)
const newResult = await tableland.read(`SELECT * FROM ${tableName};`);
console.log("Latest Tableland Result",)
newResult.rows.forEach((row) => console.log("\t", row))

// Example of a delete
// const removeRes = await tableland.write(`DELETE FROM ${tableName} WHERE id = 0;`);
