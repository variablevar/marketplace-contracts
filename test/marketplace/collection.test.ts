import { expect } from "chai";
import { Addressable, BigNumberish, Signer } from "ethers";
import { ethers } from "hardhat";
import { before, describe, it } from "mocha";

import { NFT, NFT__factory } from "../../typechain-types";

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
    [owner, creator] = await ethers.getSigners();
    CREATOR_ADDRESS = await creator.getAddress();
    const NFT = new NFT__factory(creator);
    nft = await NFT.deploy(
      COLLECTION_NAME,
      COLLECTION_SYMBOL,
      COLLECTION_IMAGE,
      CREATOR_ADDRESS,
      ROYALTY_FEE,
      CREATOR_ADDRESS
    );
    await nft.waitForDeployment();
    NFT_ADDRESS = nft.target;
    expect(nft.target).not.eq(null, "Deploy NFT factory is failed.");
  });

  describe("NFT COLLECTION", () => {
    it("IT SHOULD MINT NFT", async () => {
      for (let index = 0; index < 10; index++) {
        const tx = await nft
          .connect(creator)
          .safeMint(CREATOR_ADDRESS, NFT_TOKENS_URI[index]);
        await tx.wait();
      }

      for (let index = 0; index < 10; index++) {
        const tokenURI = await nft.tokenURI(NFT_TOKENS[index]);
        expect(tokenURI).to.equal(NFT_TOKENS_URI[index]);

        const tokenOwner = await nft.ownerOf(NFT_TOKENS[index]);
        expect(tokenOwner).to.equal(CREATOR_ADDRESS);
      }
    });

    it("IT SHOULD APPROVE NFT TO OTHERS BEHALF OF OWNER TO MARKETPLACE", async () => {
      for (let index = 0; index < 10; index++) {
        const tx = await nft
          .connect(creator)
          .approve(NFT_ADDRESS, NFT_TOKENS[index]);
        await tx.wait();
      }

      for (let index = 0; index < 10; index++) {
        const tokenURI = await nft.tokenURI(NFT_TOKENS[index]);
        expect(tokenURI).to.equal(NFT_TOKENS_URI[index]);

        const tokenOwner = await nft.ownerOf(NFT_TOKENS[index]);
        expect(tokenOwner).to.equal(CREATOR_ADDRESS);

        const approved = await nft.getApproved(NFT_TOKENS[index]);
        expect(approved).to.equal(NFT_ADDRESS);
      }
    });

    describe("ROYALTIES", () => {
      it("IT SHOULD GET ROYALTIES RECEPIENT", async () => {
        const receiptent = await nft.getRoyaltyRecipient();
        expect(receiptent).to.equal(await creator.getAddress());
      });

      it("IT SHOULD GET ROYALTIES", async () => {
        const royalty = await nft.getRoyaltyFee();
        expect(royalty).to.equal(ROYALTY_FEE);
      });

      it("IT SHOULD CHANGE ROYALTIES", async () => {
        ROYALTY_FEE = 5;
        await nft.connect(creator).updateRoyaltyFee(ROYALTY_FEE);
        const royalty = await nft.getRoyaltyFee();
        expect(royalty).to.equal(ROYALTY_FEE);
      });
    });
    /*  */
  });
});
