"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const hardhat_1 = require("hardhat");
const contracts_1 = require("../contracts");
async function listen() {
    const signers = await hardhat_1.ethers.getSigners();
    const owner = signers[7];
    const factory = contracts_1.NFTFactoryContract.connect(owner);
    const EVENT_NAME = "CreatedNFTCollection";
    const event = factory.getEvent(EVENT_NAME);
    factory.on(event, async function (creatorAddress, nftAddress, name, symbol, args) {
        console.log(creatorAddress, nftAddress, name, symbol, args);
    });
}
exports.listen = listen;
