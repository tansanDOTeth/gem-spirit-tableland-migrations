import { getTableArtifact, insertDifference } from './util.js';

import { tableland } from "./tableland.js";

const columns = [
  'stage_id',
  'spirit_id',
  'parent_stage_spirit_id'
];

const STAGE_0_ID = 1;
const STAGE_1_ID = 2;
const STAGE_2_ID = 3;
const STAGE_3_ID = 4;

const data = [
  [STAGE_0_ID, 1, null],
  [STAGE_1_ID, 2, 1],
  [STAGE_2_ID, 3, 2],
  [STAGE_3_ID, 4, 3],
];

const tableArtifact = await getTableArtifact('StageSpirits');
const { name: tableName } = tableArtifact;
const result = await tableland.read(`SELECT * FROM ${tableName};`);
await insertDifference(tableName, result.rows, columns, data)
const newResult = await tableland.read(`SELECT * FROM ${tableName};`);
console.log("Latest Tableland Result")
newResult.rows.forEach((row) => console.log("\t", row))

// Example of a delete
// const removeRes = await tableland.write(`DELETE FROM ${tableName} WHERE id = 0;`);
