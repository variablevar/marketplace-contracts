import { expect } from "chai";
import { Addressable, BigNumberish, Signer } from "ethers";
import { ethers } from "hardhat";
import { before, describe, it } from "mocha";

import {
  NFT,
  NFTFactory,
  NFTFactory__factory,
  NFTMarketplace,
  NFTMarketplace__factory,
  NFT__factory,
} from "../../typechain-types";

function toWei(value: number) {
  return ethers.parseEther(value.toString());
}

describe("Marketplace", () => {
  let nft: NFT;
  let NFT_ADDRESS: string | Addressable;
  let factory: NFTFactory;
  let FACTORY_ADDRESS: string | Addressable;
  let marketplace: NFTMarketplace;
  let MARKETPLACE_ADDRESS: string | Addressable;
  let owner: Signer;
  let creator: Signer;
  let buyer: Signer;
  let offerer: Signer;
  let bidder: Signer;
  const COLLECTION_NAME = "DEBIAN";
  const COLLECTION_SYMBOL = "DEB";
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
    [owner, creator, buyer, offerer, bidder] = await ethers.getSigners();
    const Factory = new NFTFactory__factory(owner);
    factory = await Factory.deploy();
    await factory.waitForDeployment();
    FACTORY_ADDRESS = factory.target;
    expect(factory.target).not.eq(null, "Deploy NFT factory is failed.");

    const Marketplace = new NFTMarketplace__factory(owner);

    const feeRecipient = await owner.getAddress();
    marketplace = await Marketplace.deploy(
      PLATFORM_FEE,
      feeRecipient,
      factory.target
    );
    await marketplace.waitForDeployment();
    MARKETPLACE_ADDRESS = marketplace.target;
    expect(marketplace.target).not.eq(null, "Deploy marketplace is failed.");
  });

  describe("DEPLOYMENT & TESTING OF NFT FACTORY", () => {
    it("IT SHOULD HAVE DEPLOYED SMART CONTRACTS", () => {
      expect(FACTORY_ADDRESS).not.equal(null, "NFT FACTORY NOT DEPLOYED");
      expect(MARKETPLACE_ADDRESS).not.equal(
        null,
        "NFT MARKETPLACE NOT DEPLOYED"
      );
    });

    it("IT SHOULD CREATE NFT COLLECTION", async () => {
      const EVENT_NAME = "CreatedNFTCollection";
      const event = factory.getEvent(EVENT_NAME);

      factory.on(
        event,
        async function (creatorAddress, nftAddress, name, symbol, args) {
          expect(creatorAddress).to.equal(await creator.getAddress());
          expect(name).to.equal(COLLECTION_NAME);
          expect(symbol).to.equal(COLLECTION_SYMBOL);

          NFT_ADDRESS = nftAddress;

          const contract = new NFT__factory(creator);
          nft = contract.attach(NFT_ADDRESS) as NFT;
          Promise.resolve();
        }
      );

      const tx = await factory
        .connect(creator)
        .createNFTCollection.send(
          COLLECTION_NAME,
          COLLECTION_SYMBOL,
          ROYALTY_FEE,
          creator
        );

      await tx.wait();
    });

    it("IT SHOULD GET OWNED COLLECTION", async () => {
      const collections = await factory.connect(creator).getOwnCollections();
      expect(collections).to.deep.equal([NFT_ADDRESS]);
    });

    it("IT SHOULD CHECK THE NFT IS FACTORY NFT", async () => {
      const isFactoryNFT = await factory.isfactoryNFT(NFT_ADDRESS);
      const isNOTFactoryNFT = await factory.isfactoryNFT(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      );

      expect(isFactoryNFT).to.be.true;
      expect(isNOTFactoryNFT).to.be.false;
    });
  });

  describe("NFT COLLECTION", () => {
    it("IT SHOULD MINT NFT", async () => {
      const CREATOR_ADDRESS = await creator.getAddress();
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
      const CREATOR_ADDRESS = await creator.getAddress();
      for (let index = 0; index < 10; index++) {
        const tx = await nft
          .connect(creator)
          .approve(MARKETPLACE_ADDRESS, NFT_TOKENS[index]);
        await tx.wait();
      }

      for (let index = 0; index < 10; index++) {
        const tokenURI = await nft.tokenURI(NFT_TOKENS[index]);
        expect(tokenURI).to.equal(NFT_TOKENS_URI[index]);

        const tokenOwner = await nft.ownerOf(NFT_TOKENS[index]);
        expect(tokenOwner).to.equal(CREATOR_ADDRESS);

        const approved = await nft.getApproved(NFT_TOKENS[index]);
        expect(approved).to.equal(MARKETPLACE_ADDRESS);
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

  describe("MARKETPLACE", () => {
    it("IT SHOULD ALLOW USER TO LIST NFT", async () => {
      for (let index = 0; index < 10; index++) {
        const tx = await marketplace
          .connect(creator)
          .listNft(NFT_ADDRESS, NFT_TOKENS[index], NFT_PRICES[index]);
      }
    });
  });
});
