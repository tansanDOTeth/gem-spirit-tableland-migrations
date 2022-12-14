import './fetch-polyfill.js';

import * as fs from 'fs';

import { provider, tableland } from "./tableland.js";

import { tables } from './tables.js';

const { name: chainName } = await provider.getNetwork();
const artifactsDirectory = `./artifacts/${chainName}`;

if (!fs.existsSync(artifactsDirectory)) {
  fs.mkdirSync(artifactsDirectory);
}

const validateReceipt = async (txnHash) => {
  const receipt = await tableland.receipt(txnHash)
  if (!receipt.error) return receipt
  throw new Error(receipt)
}

const createTableIfDoesNotExist = async (prefix, schema, dryRun = false) => {
  if (!prefix) {
    throw new Error('Need table prefix to create table');
  }

  const artifactFilePath = `${artifactsDirectory}/${prefix}.json`;
  let tableArtifact;
  let tableExists = false;

  try {
    const rawData = fs.readFileSync(artifactFilePath);
    tableArtifact = JSON.parse(rawData);

    if (tableArtifact) {
      const tables = await tableland.list();
      tableExists = !!tables.find(table => table.name === tableArtifact.name);
    }

    if (tableExists) {
      console.log("Table exists!", tableArtifact.name)
      return
    }
  } catch (error) {
    if (!error.code === 'ENOENT') {
      throw error;
    }
  }

  console.log(`Creating table with prefix ${prefix}....`)
  if (dryRun) {
    console.log("\tSchema\n\t", schema)
    console.log("\tArtifacts path", artifactFilePath)
    return
  }

  try {
    const result = await tableland.create(schema, { prefix });
    await validateReceipt(result.txnHash)
    console.log("Created new table! Table Result:", result.name);
    fs.writeFileSync(artifactFilePath, JSON.stringify(result));
    console.log("Table artifact saved:", artifactFilePath);
    return result;
  } catch (error) {
    console.log("Error when creating a table\n\t", prefix, schema)
    throw error
  }
}

for (const { prefix, schema } of tables) {
  await createTableIfDoesNotExist(prefix, schema)
}
