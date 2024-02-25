import { expect } from "chai";
import { BigNumberish, Signer } from "ethers";
import { ethers } from "hardhat";
import { before } from "mocha";

import {
  IERC20,
  NFT,
  NFTFactory,
  NFTFactory__factory,
  NFTMarketplace,
  NFTMarketplace__factory,
} from "../../typechain-types";

function toWei(value: number) {
  return ethers.parseEther(value.toString());
}

describe("Kuiper Marketplace", () => {
  let nft: NFT;
  let factory: NFTFactory;
  let marketplace: NFTMarketplace;
  let owner: Signer;
  let creator: Signer;
  let buyer: Signer;
  let offerer: Signer;
  let bidder: Signer;
  let payableToken: IERC20;

  before(async () => {
    [owner, creator, buyer, offerer, bidder] = await ethers.getSigners();
    const Factory = new NFTFactory__factory(owner);
    factory = await Factory.deploy();
    await factory.waitForDeployment();
    expect(factory.target).not.eq(null, "Deploy factory is failed.");

    const Marketplace = new NFTMarketplace__factory(owner);
    const platformFee = 10 as BigNumberish; // 10%
    const feeRecipient = await owner.getAddress();
    marketplace = await Marketplace.deploy(
      platformFee,
      feeRecipient,
      factory.target
    );
    await marketplace.waitForDeployment();
    expect(marketplace.target).not.eq(null, "Deploy marketplace is failed.");

    // Transfer payable token to tester
    const buyerAddress = await buyer.getAddress();
    const offererAddress = await offerer.getAddress();
    await payableToken.connect(owner).transfer(buyerAddress, toWei(1000000));
    expect(await payableToken.balanceOf(buyerAddress)).to.eq(toWei(1000000));
    await payableToken.connect(owner).transfer(offererAddress, toWei(1000000));
    expect(await payableToken.balanceOf(offererAddress)).to.eq(toWei(1000000));

    const royaltyRecipient = await creator.getAddress();
    const tx = await factory
      .connect(creator)
      .createNFTCollection(
        "Kuiper Collection",
        "KUIPER",
        (10 * 100) as BigNumberish,
        royaltyRecipient
      );
    const receipt = await tx.wait();
  });
});
