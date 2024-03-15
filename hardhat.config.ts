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
      url: process.env.RPC_URL || "http://3.109.120.65:8545",
      gas: "auto",
      gasPrice: "auto",
      timeout: 10000,
      chainId: 1337,
      accounts: [
        process.env.ACCOUNT_0 || "",
        process.env.ACCOUNT_1 || "",
        process.env.ACCOUNT_2 || "",
        process.env.ACCOUNT_3 || "",
        process.env.ACCOUNT_4 || "",
        process.env.ACCOUNT_5 || "",
        process.env.ACCOUNT_6 || "",
        process.env.ACCOUNT_7 || "",
        process.env.ACCOUNT_8 || "",
        process.env.ACCOUNT_9 || "",
        process.env.ACCOUNT_101 || "",
        process.env.ACCOUNT_102 || "",
        process.env.ACCOUNT_103 || "",
        process.env.ACCOUNT_104 || "",
        process.env.ACCOUNT_105 || "",
        process.env.ACCOUNT_106 || "",
        process.env.ACCOUNT_107 || "",
        process.env.ACCOUNT_108 || "",
        process.env.ACCOUNT_109 || "",
        process.env.ACCOUNT_110 || "",
        process.env.ACCOUNT_111 || "",
        process.env.ACCOUNT_112 || "",
        process.env.ACCOUNT_113 || "",
        process.env.ACCOUNT_114 || "",
        process.env.ACCOUNT_115 || "",
        process.env.ACCOUNT_116 || "",
        process.env.ACCOUNT_117 || "",
        process.env.ACCOUNT_118 || "",
        process.env.ACCOUNT_119 || "",
        process.env.ACCOUNT_120 || "",
      ],
    },
  },
};

export default config;
