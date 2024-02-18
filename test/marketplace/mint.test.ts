import { expect } from "chai";
import { ethers } from "hardhat";
import { MarketplaceContract } from "../../lib";
import { Marketplace } from "../../typechain";

describe("Marketplace Contract", function () {
  let marketplace: MarketplaceContract;
  let contract: Marketplace;
  let owner: string =
    "0x40ad2cb3ad99d83e1cc4a1d4c402023b0899d57716444c8c71002980d02952bc";
  let addr1: string = "0x3f9D6033acc1CC7201b7CF734ffa4a7AdB0C226A";
  let RPC_URL = "http://127.0.0.1:7545";

  beforeEach(async function () {
    marketplace = new MarketplaceContract();
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    contract = MarketplaceContract.connect(
      marketplace.ADDRESS,
      await provider.getSigner(addr1)
    );
  });

  it("Should mint a new NFT", async function () {
    const tokenURI = "https://example.com/token/";
    const price = ethers.parseEther("0.01"); // Price in Ether

    // Minting a new NFT
    await expect(contract.mint(tokenURI, price))
      .to.emit(contract, "Transfer") // Check for Transfer event
      .withArgs(ethers.ZeroAddress, owner, 1); // Check for tokenId 1
  });

  xit("Should revert if minting price is not provided", async function () {
    const tokenURI = "https://example.com/token/1";

    // Attempting to mint a new NFT without providing the price
    await expect(contract.mint(tokenURI, 0)).to.be.revertedWith(
      "PRICE MUST BE ATLEAST 1"
    );
  });
});
