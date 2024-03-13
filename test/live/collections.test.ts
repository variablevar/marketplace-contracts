import { Addressable, BigNumberish, Signer } from "ethers";
import { ethers } from "hardhat";
import { before, describe } from "mocha";

import { NFT } from "../../typechain-types";

function toWei(value: number) {
  return ethers.parseEther(value.toString());
}

describe("Marketplace", () => {
  let nft: NFT;
  let NFT_ADDRESS: string | Addressable;
  let CREATOR_ADDRESS: string | Addressable;
  let owner: Signer;
  let creator: Signer;

  const COLLECTION_NAME = "DEBIAN";
  const COLLECTION_SYMBOL = "DEB";
  const COLLECTION_IMAGE = "http://image/";

  const PLATFORM_FEE: BigNumberish = 7;
  let ROYALTY_FEE: BigNumberish = 2;

  const NFT_TOKENS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const NFT_TOKENS_URI = [
    "http://url/0",
    "http://url/1",
    "http://url/2",
    "http://url/3",
    "http://url/4",
    "http://url/5",
    "http://url/6",
    "http://url/7",
    "http://url/8",
    "http://url/9",
  ];
  const NFT_PRICES: bigint[] = [
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
    toWei(0.0001),
  ];

  before(async () => {
    const signers = await ethers.getSigners();
    for (let index = 0; index < signers.length; index++) {
      const signer = signers[index];
      console.log(signer.address);
    }
    // CREATOR_ADDRESS = await creator.getAddress();
    // const NFT = new NFT__factory(creator);
    // nft = await NFT.deploy(
    //   COLLECTION_NAME,
    //   COLLECTION_SYMBOL,
    //   COLLECTION_IMAGE,
    //   CREATOR_ADDRESS,
    //   ROYALTY_FEE,
    //   CREATOR_ADDRESS
    // );
    // await nft.waitForDeployment();
    // NFT_ADDRESS = nft.target;
    // expect(nft.target).not.eq(null, "Deploy NFT factory is failed.");
  });
});
