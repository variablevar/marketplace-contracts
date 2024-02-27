"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const config = {
    solidity: "0.8.20",
    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
            gas: "auto",
            gasPrice: "auto",
            timeout: 10000,
            chainId: 1337,
            accounts: [
                // 0
                // `0xd923a97d08ac110a423ec79bdbefb8f25c8b39f271ce4fb90145dbcfbd5aa337`,
                // 7
                `0x40ad2cb3ad99d83e1cc4a1d4c402023b0899d57716444c8c71002980d02952bc`,
            ],
        },
    },
};
exports.default = config;
