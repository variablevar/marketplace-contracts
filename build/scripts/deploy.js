"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    await deploy('Marketplace');
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
async function deploy(name) {
    const Contract = await hardhat_1.ethers.getContractFactory(name);
    const contract = await Contract.deploy();
    await contract.waitForDeployment();
    console.log(`${name} with ETH\ndeployed to ${contract.target}`);
}
