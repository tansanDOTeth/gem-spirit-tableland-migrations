import { getTableArtifact, insertDifference } from './util.js';

import { tableland } from "./tableland.js";

const data = [
  ['KIPPAN 0001'],
];

const tableArtifact = await getTableArtifact('Generations');
const { name: tableName } = tableArtifact;
const result = await tableland.read(`SELECT * FROM ${tableName};`);
await insertDifference(tableName, result.rows, ['name'], data)
const newResult = await tableland.read(`SELECT * FROM ${tableName};`);
console.log("Latest Tableland Result",)
newResult.rows.forEach((row) => console.log("\t", row))

// Example of a delete
// const removeRes = await tableland.write(`DELETE FROM ${tableName} WHERE id = 0;`);
