import * as fs from 'fs';

import { provider, tableland } from "./tableland.js";

/* 
  This only works if and only if the last two columns are created_at and updated_at because
  it will truncate that before finding the difference between the Tableland data and the data 
  in the script.
*/
export const insertDifference = async (tableName, previousRows, columns, nextRows) => {
  if (nextRows.length < previousRows.length) {
    console.log("No new rows. This expects only new rows to be appended. Do not go back to edit the old ones.")
    return
  }

  const prevRowsWithoutTimestamps = previousRows.map(prevRow => prevRow.slice(0, -2));
  const newRows = nextRows.filter((values) => !prevRowsWithoutTimestamps.find(([_id, ...previousValues]) => previousValues.join(',') === values.join(',')))

  if (newRows.length === 0) {
    console.log('There are no new rows to insert')
    return
  }
  const now = Date.now();
  const queries = newRows.map((values) =>
    buildInsertQuery(
      tableName,
      [...columns, 'created_at', 'updated_at'],
      [...values, now, now]
    ))
  console.log("Queries to be run...")
  queries.forEach((query) => console.log("\t", query))
  try {
    console.log("Inserting data into Tableland...")
    const result = await tableland.write(queries.join(' '));
    console.log("Successfully inserted data! Transaction hash:", result.hash)
    return result;
  } catch (error) {
    console.log("Error inserting data for\n\t", tableName, "\n\t", error.message)
  }
}

const buildInsertQuery = (tableName, columns, values) => {
  if (columns.length !== values.length) {
    throw new Error('The number of items in columns and values have to be the same.')
  }
  return `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.map(value => `'${value}'`).join(', ')});`
}

export const getTableArtifact = async (tablePrefix) => {
  try {
    const { name: chainName } = await provider.getNetwork();
    const artifactFilePath = `./artifacts/${chainName}/${tablePrefix}.json`;
    const rawData = fs.readFileSync(artifactFilePath);
    return JSON.parse(rawData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("File does not exist", artifactFilePath)
    }
    throw error;
  }
}