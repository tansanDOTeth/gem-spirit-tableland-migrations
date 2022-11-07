import { getTableArtifact, insertDifference } from './util.js';

import { tableland } from "./tableland.js";

const data = [
  [16, 16, 2],
];

const tableArtifact = await getTableArtifact('SpriteSheetVersion');
const { name: tableName } = tableArtifact;
const result = await tableland.read(`SELECT * FROM ${tableName};`);
await insertDifference(tableName, result.rows, ['sprite_width_px', 'sprite_height_px', 'sprite_spacing_px'], data)
const newResult = await tableland.read(`SELECT * FROM ${tableName};`);
console.log("Latest Tableland Result",)
newResult.rows.forEach((row) => console.log("\t", row))

// Example of a delete
// const removeRes = await tableland.write(`DELETE FROM ${tableName};`);
// const newResult = await tableland.read(`SELECT * FROM ${tableName};`);
// console.log("Latest Tableland Result",)
// newResult.rows.forEach((row) => console.log("\t", row))