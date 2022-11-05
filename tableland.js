import './fetch-polyfill.js';

import * as dotenv from 'dotenv';

import { Wallet, providers } from "ethers";

import { connect } from "@tableland/sdk";

dotenv.config()

const wallet = new Wallet(process.env.PRIVATE_KEY);
export const provider = new providers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_API_KEY);
const signer = wallet.connect(provider);
export const tableland = await connect({ signer, network: "testnet", chain: `ethereum-${process.env.NETWORK}` });
