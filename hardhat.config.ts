import "@nomicfoundation/hardhat-toolbox";
import { config as conf } from "dotenv";
import { HardhatUserConfig } from "hardhat/types";

conf();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20", // Specify compiler version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Adjust optimization runs as needed
      },
    },
  },
  networks: {
    ganache: {
      url: process.env.RPC_URL,
      gas: "auto",
      gasPrice: "auto",
      timeout: 10000,
      chainId: 1337,
      accounts: [
        process.env.ACCOUNT_0!,
        process.env.ACCOUNT_1!,
        process.env.ACCOUNT_2!,
        process.env.ACCOUNT_3!,
        process.env.ACCOUNT_4!,
        process.env.ACCOUNT_5!,
        process.env.ACCOUNT_6!,
        process.env.ACCOUNT_7!,
        process.env.ACCOUNT_8!,
        process.env.ACCOUNT_9!,
        process.env.ACCOUNT_11!,
        process.env.ACCOUNT_12!,
        process.env.ACCOUNT_13!,
        process.env.ACCOUNT_14!,
        process.env.ACCOUNT_15!,
        process.env.ACCOUNT_16!,
        process.env.ACCOUNT_17!,
        process.env.ACCOUNT_18!,
        process.env.ACCOUNT_19!,
        process.env.ACCOUNT_20!,
        process.env.ACCOUNT_21!,
        process.env.ACCOUNT_22!,
        process.env.ACCOUNT_23!,
        process.env.ACCOUNT_24!,
        process.env.ACCOUNT_25!,
        process.env.ACCOUNT_26!,
        process.env.ACCOUNT_27!,
        process.env.ACCOUNT_28!,
        process.env.ACCOUNT_29!,
        process.env.ACCOUNT_30!,
        process.env.ACCOUNT_31!,
        process.env.ACCOUNT_32!,
        process.env.ACCOUNT_33!,
        process.env.ACCOUNT_34!,
        process.env.ACCOUNT_35!,
      ],
    },
  },
};

export default config;
