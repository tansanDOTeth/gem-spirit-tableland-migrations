import { getTableArtifact, insertDifference } from './util.js';

import { tableland } from "./tableland.js";

const columns = [
  'sprite_sheet_uri',
  'sprite_sheet_version_id'
];

const SPRITE_SHEET_VERSION_ID = 1; // 16x16 sprite dimensions
const data = [
  [
    'https://analyzer.gemspirits.monster/sprite-sheets/01-00-00.png',
    SPRITE_SHEET_VERSION_ID,
  ],
  [
    'https://analyzer.gemspirits.monster/sprite-sheets/01-01-00.png',
    SPRITE_SHEET_VERSION_ID,
  ],
  [
    'https://analyzer.gemspirits.monster/sprite-sheets/01-02-00.png',
    SPRITE_SHEET_VERSION_ID,
  ],
  [
    'https://analyzer.gemspirits.monster/sprite-sheets/01-03-00.png',
    SPRITE_SHEET_VERSION_ID,
  ],
];

const tableArtifact = await getTableArtifact('Spirits');
const { name: tableName } = tableArtifact;
const result = await tableland.read(`SELECT * FROM ${tableName};`);
await insertDifference(tableName, result.rows, columns, data)
const newResult = await tableland.read(`SELECT * FROM ${tableName};`);
console.log("Latest Tableland Result")
newResult.rows.forEach((row) => console.log("\t", row))

// Example of a delete
// const removeRes = await tableland.write(`DELETE FROM ${tableName} WHERE id = 1;`);
