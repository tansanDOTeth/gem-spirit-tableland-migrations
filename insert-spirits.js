import { getTableArtifact, insertDifference } from './util.js';

import { tableland } from "./tableland.js";

const SPRITE_SHEET_VERSION_ID = 1; // 16x16 sprite dimensions
const data = [
  ['https://analyzer.gemspirits.monster/static/media/choku.2e282c267596be1685a8.png', SPRITE_SHEET_VERSION_ID],
];

const tableArtifact = await getTableArtifact('Spirits');
const { name: tableName } = tableArtifact;
const result = await tableland.read(`SELECT * FROM ${tableName};`);
await insertDifference(tableName, result.rows, ['sprite_sheet_uri', 'sprite_sheet_version_id'], data)
const newResult = await tableland.read(`SELECT * FROM ${tableName};`);
console.log("Latest Tableland Result")
newResult.rows.forEach((row) => console.log("\t", row))

// Example of a delete
// const removeRes = await tableland.write(`DELETE FROM ${tableName} WHERE id = 0;`);
