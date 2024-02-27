"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const lib_1 = require("../../lib");
describe("Marketplace Contract", function () {
    let marketplace;
    let contract;
    let owner = "0x40ad2cb3ad99d83e1cc4a1d4c402023b0899d57716444c8c71002980d02952bc";
    let addr1 = "0xd923a97d08ac110a423ec79bdbefb8f25c8b39f271ce4fb90145dbcfbd5aa337";
    let RPC_URL = "http://127.0.0.1:7545";
    beforeEach(async function () {
        marketplace = new lib_1.MarketplaceContract();
        const provider = new hardhat_1.ethers.JsonRpcProvider(RPC_URL);
        contract = lib_1.MarketplaceContract.connect(marketplace.ADDRESS, await provider.getSigner());
    });
    it("Should mint a new NFT", async function () {
        const tokenURI = "https://example.com/token/";
        const price = hardhat_1.ethers.parseEther("0.01"); // Price in Ether
        const transctionResponse = await contract.mint(tokenURI, price);
        console.log(transctionResponse);
        // Minting a new NFT
        // await expect(contract.mint(tokenURI, price))
        //   .to.emit(contract, "Transfer") // Check for Transfer event
        //   .withArgs(ethers.ZeroAddress, owner, 1); // Check for tokenId 1
    });
    xit("Should revert if minting price is not provided", async function () {
        const tokenURI = "https://example.com/token/1";
        // Attempting to mint a new NFT without providing the price
        await (0, chai_1.expect)(contract.mint(tokenURI, 0)).to.be.revertedWith("PRICE MUST BE ATLEAST 1");
    });
});
