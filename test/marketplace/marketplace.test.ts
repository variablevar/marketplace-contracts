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

describe("INTEGRATION", () => {
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
  let bidder1: Signer;
  let bidder2: Signer;
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
    toWei(0.00011),
    toWei(0.00012),
    toWei(0.00013),
    toWei(0.00014),
    toWei(0.00015),
    toWei(0.00016),
    toWei(0.00017),
    toWei(0.00018),
    toWei(0.00019),
  ];

  before(async () => {
    [owner, creator, buyer, offerer, bidder1, bidder2] =
      await ethers.getSigners();
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
        async function (
          creatorAddress,
          nftAddress,
          name,
          imageURL,
          symbol,
          args
        ) {
          expect(creatorAddress).to.equal(await creator.getAddress());
          expect(name).to.equal(COLLECTION_NAME);
          expect(symbol).to.equal(COLLECTION_SYMBOL);
          expect(imageURL).to.equal(COLLECTION_IMAGE);

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
          COLLECTION_IMAGE,
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

      const EVENT_NAME = "Minted";
      const event = nft.getEvent(EVENT_NAME);
      nft.on(
        event,
        async function (creator: string, to: string, tokenId: bigint, args) {
          expect(creator).to.equal(CREATOR_ADDRESS);
          expect(to).to.equal(CREATOR_ADDRESS);
          expect(NFT_TOKENS).to.include(tokenId);
        }
      );
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
    it("IT SHOULD APPROVE NFT TO MARKETPLACE", async () => {
      for (let index = 0; index < 10; index++) {
        const tx = await nft
          .connect(creator)
          .approve(MARKETPLACE_ADDRESS, NFT_TOKENS[index]);
        await tx.wait();
      }
      for (let index = 0; index < 10; index++) {
        const approved = await nft.getApproved(NFT_TOKENS[index]);
        expect(approved).to.be.equal(MARKETPLACE_ADDRESS);
      }
    });

    describe("MARKETPLACE LISTING", async () => {
      let CREATOR_ADDRESS: string;
      const TOKEN_ID = 0;

      before(async () => {
        CREATOR_ADDRESS = await creator.getAddress();
      });

      it("IT SHOULD LIST THE NFT TO MARKETPLACE", async () => {
        const CREATOR_ADDRESS = await creator.getAddress();

        const EVENT_NAME = "ListedNFT";
        const event = marketplace.getEvent(EVENT_NAME);

        marketplace.on(event, function (nfts, tokenId, price, seller) {
          expect(nfts).to.equal(NFT_ADDRESS);
          expect(NFT_TOKENS).to.include(tokenId);
          expect(NFT_PRICES).to.include(price);
          expect(seller).to.equal(CREATOR_ADDRESS);
        });

        for (let index = 0; index < 10; index++) {
          const tx = await marketplace
            .connect(creator)
            .listNft(NFT_ADDRESS, NFT_TOKENS[index], NFT_PRICES[index]);
          await tx.wait();
        }
      });

      it("IT SHOULD ALLOW USER TO CANCEL LIST OF NFT ON MARKETPLACE", async () => {
        expect(await nft.ownerOf(TOKEN_ID)).to.equal(MARKETPLACE_ADDRESS);
        const tx = await marketplace
          .connect(creator)
          .cancelListedNFT(NFT_ADDRESS, TOKEN_ID);
        await tx.wait();
        expect(await nft.ownerOf(TOKEN_ID)).to.equal(CREATOR_ADDRESS);
      });

      it("IT SHOULD ALLOW USER TO RE-LIST NFT ON MARKETPLACE", async () => {
        expect(await nft.ownerOf(TOKEN_ID)).to.equal(CREATOR_ADDRESS);

        /* ALLOW APPROVAL TO MARKETPLACE */
        await nft.connect(creator).approve(MARKETPLACE_ADDRESS, TOKEN_ID);

        /* LIST NFT */
        await marketplace
          .connect(creator)
          .listNft(NFT_ADDRESS, TOKEN_ID, NFT_PRICES[TOKEN_ID]);
        /* CHECK OWNERSHIP SINCE LISTED */
        expect(await nft.ownerOf(TOKEN_ID)).to.equal(MARKETPLACE_ADDRESS);

        /* CANCEL LISTING */
        await marketplace
          .connect(creator)
          .cancelListedNFT(NFT_ADDRESS, TOKEN_ID);

        /* CHECK AFTER CANCEL LISTING OWNER OF TOKEN/NFT */
        expect(await nft.ownerOf(TOKEN_ID)).to.equal(CREATOR_ADDRESS);

        NFT_PRICES[TOKEN_ID] = toWei(0.0002);
        /* RELIST */

        /* ALLOW APPROVAL TO MARKETPLACE */
        await nft.connect(creator).approve(MARKETPLACE_ADDRESS, TOKEN_ID);
        await marketplace
          .connect(creator)
          .listNft(NFT_ADDRESS, TOKEN_ID, NFT_PRICES[TOKEN_ID]);
        /* CHECK OWNERSHIP SINCE RE-LISTED */
        expect(await nft.ownerOf(TOKEN_ID)).to.equal(MARKETPLACE_ADDRESS);
      });

      it("IT SHOULD RETERIVE THE LISTED ITEM FROM CHAIN", async () => {
        for (let index = 0; index < 10; index++) {
          const listedNFT = await marketplace.getListedNFT(
            NFT_ADDRESS,
            NFT_TOKENS[index]
          );

          expect(listedNFT[0]).to.be.equal(NFT_ADDRESS);
          expect(listedNFT[1]).to.be.equal(NFT_TOKENS[index]);
          expect(listedNFT[2]).to.be.equal(CREATOR_ADDRESS);
          expect(listedNFT[3]).to.be.equal(NFT_PRICES[index]);
          expect(listedNFT[4]).to.be.false;
        }
      });
    });

    describe("MARKETPLACE BUYING / PURCHASE", async () => {
      let CREATOR_ADDRESS: string;
      let BUYER_ADDRESS: string;
      const TOKEN_ID = 0;
      const NFT_PRICE = toWei(0.0002);

      before(async () => {
        CREATOR_ADDRESS = await creator.getAddress();
        BUYER_ADDRESS = await buyer.getAddress();
      });

      it("IT SHOULD ALLOW USER TO BUY LISTED NFT", async () => {
        const EVENT_NAME = "BoughtNFT";
        const event = marketplace.getEvent(EVENT_NAME);
        marketplace.on(event, function (nfts, tokenId, price, seller, buyer) {
          expect(nfts).to.equal(NFT_ADDRESS);
          expect(tokenId).to.equal(TOKEN_ID);
          expect(price).to.equal(NFT_PRICE);
          expect(seller).to.equal(CREATOR_ADDRESS);
          expect(buyer).to.equal(BUYER_ADDRESS);
          Promise.resolve();
        });

        const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

        const tx = await marketplace
          .connect(buyer)
          .buyNFT(NFT_ADDRESS, TOKEN_ID, { value: NFT_PRICE });

        await tx.wait();

        expect(await nft.ownerOf(TOKEN_ID)).to.equal(BUYER_ADDRESS);
      });
    });

    describe("MARKETPLACE OFFERING", () => {
      let CREATOR_ADDRESS: string;
      let OFFERER_ADDRESS: string;
      const TOKEN_ID = 1;
      const OFFER_PRICE = NFT_PRICES[TOKEN_ID] + NFT_PRICES[TOKEN_ID]; // 2x

      before(async () => {
        CREATOR_ADDRESS = await creator.getAddress();
        OFFERER_ADDRESS = await offerer.getAddress();
      });
      it("IT ALLOW USER TO OFFER NFT OVER MARKETPLACE", async () => {
        const EVENT_NAME = "OfferredNFT";
        const event = marketplace.getEvent(EVENT_NAME);
        marketplace.on(event, function (nfts, tokenId, offerPrice, offerer) {
          expect(nfts).to.equal(NFT_ADDRESS);
          expect(tokenId).to.equal(TOKEN_ID);
          expect(offerPrice).to.equal(OFFER_PRICE);
          expect(offerer).to.equal(OFFERER_ADDRESS);
          Promise.resolve();
        });

        const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

        const tx = await marketplace
          .connect(offerer)
          .offerNFT(NFT_ADDRESS, TOKEN_ID, { value: OFFER_PRICE });

        await tx.wait();
      });

      it("IT SHOULD ALLOW USER TO CANCEL OFFER", async () => {
        const EVENT_NAME = "CanceledOfferredNFT";
        const event = marketplace.getEvent(EVENT_NAME);
        marketplace.on(event, function (nfts, tokenId, offerPrice, offerer) {
          expect(nfts).to.equal(NFT_ADDRESS);
          expect(tokenId).to.equal(TOKEN_ID);
          expect(offerPrice).to.equal(OFFER_PRICE);
          expect(offerer).to.equal(OFFERER_ADDRESS);
          Promise.resolve();
        });

        const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

        const tx = await marketplace
          .connect(creator)
          .cancelOfferNFT(NFT_ADDRESS, TOKEN_ID, OFFERER_ADDRESS);

        await tx.wait();
      });

      it("IT SHOULD ALLOW USER TO ACCEPT OFFER", async () => {
        const EVENT_NAME = "OfferredNFT";
        const event = marketplace.getEvent(EVENT_NAME);
        marketplace.on(
          event,
          async function (nfts, tokenId, offerPrice, offerer) {
            expect(nfts).to.equal(NFT_ADDRESS);
            expect(tokenId).to.equal(TOKEN_ID);
            expect(offerPrice).to.equal(OFFER_PRICE);
            expect(offerer).to.equal(OFFERER_ADDRESS);

            const EVENT_NAME = "AcceptedNFT";
            const event = marketplace.getEvent(EVENT_NAME);
            marketplace.on(
              event,
              async function (nfts, tokenId, offerPrice, offerer, nftOwner) {
                expect(nfts).to.equal(NFT_ADDRESS);
                expect(tokenId).to.equal(TOKEN_ID);
                expect(offerPrice).to.equal(OFFER_PRICE);
                expect(offerer).to.equal(OFFERER_ADDRESS);
                expect(nftOwner).to.equal(CREATOR_ADDRESS);

                const newOwnerOfNFT = await nft.ownerOf(TOKEN_ID);
                expect(newOwnerOfNFT).to.equal(OFFERER_ADDRESS);
                Promise.resolve();
              }
            );

            const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
            expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

            const tx = await marketplace
              .connect(creator)
              .acceptOfferNFT(NFT_ADDRESS, TOKEN_ID, OFFERER_ADDRESS);

            await tx.wait();
          }
        );

        const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

        const tx = await marketplace
          .connect(offerer)
          .offerNFT(NFT_ADDRESS, TOKEN_ID, { value: OFFER_PRICE });

        await tx.wait();
      });
    });

    describe("MARKETPLACE AUCTION", () => {
      let CREATOR_ADDRESS: string;
      let BIDDER_1_ADDRESS: string;
      let BIDDER_2_ADDRESS: string;
      let AUCTION_START_TIME = Date.now() / 1000 + 60;
      let AUCTION_END_TIME = Date.now() / 1000 + 600;

      const TOKEN_ID = 7;
      const TOKEN_PRICE = NFT_PRICES[TOKEN_ID];
      const MINIMUM_BID = toWei(0.0001);
      const AUCTION_ALREADY_STARTED = "AUCTION ALREADY STARTED";

      before(async () => {
        CREATOR_ADDRESS = await creator.getAddress();
        BIDDER_1_ADDRESS = await bidder1.getAddress();
        BIDDER_2_ADDRESS = await bidder2.getAddress();
      });

      xit("IT SHOULD ALLOW USER TO START AUCTION", async () => {
        const EVENT_NAME = "CreatedAuction";
        const event = marketplace.getEvent(EVENT_NAME);
        marketplace.on(
          event,
          function (
            nfts,
            tokenId,
            price,
            minimunBid,
            startTime,
            endTime,
            auctionCreator
          ) {
            expect(nfts).to.equal(NFT_ADDRESS);
            expect(tokenId).to.equal(TOKEN_ID);
            expect(price).to.equal(TOKEN_PRICE);
            expect(minimunBid).to.equal(MINIMUM_BID);
            expect(startTime).to.equal(AUCTION_START_TIME);
            expect(endTime).to.equal(AUCTION_END_TIME);
            expect(auctionCreator).to.equal(CREATOR_ADDRESS);
            Promise.resolve();
          }
        );

        const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

        const tx = await marketplace
          .connect(creator)
          .createAuction(
            NFT_ADDRESS,
            TOKEN_ID,
            TOKEN_PRICE,
            MINIMUM_BID,
            AUCTION_START_TIME,
            AUCTION_END_TIME
          );
        await tx.wait();
      });

      xit("IT SHOULD ALLOW USER TO STOP AUCTION BEFORE START", async () => {
        const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

        const tx = await marketplace
          .connect(creator)
          .cancelAuction(NFT_ADDRESS, TOKEN_ID);
        await tx.wait();

        const newOwnerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(newOwnerOfNFT).to.equal(CREATOR_ADDRESS);
      });
      xit("IT SHOULD NOT ALLOW USER TO STOP AUCTION AFTER IT START", async () => {
        AUCTION_START_TIME = Date.now() / 1000;
        AUCTION_END_TIME = Date.now() / 1000 + 120;

        const EVENT_NAME = "CreatedAuction";
        const event = marketplace.getEvent(EVENT_NAME);
        marketplace.on(
          event,
          async function (
            nfts,
            tokenId,
            price,
            minimunBid,
            startTime,
            endTime,
            auctionCreator
          ) {
            expect(nfts).to.equal(NFT_ADDRESS);
            expect(tokenId).to.equal(TOKEN_ID);
            expect(price).to.equal(TOKEN_PRICE);
            expect(minimunBid).to.equal(MINIMUM_BID);
            expect(startTime).to.equal(AUCTION_START_TIME);
            expect(endTime).to.equal(AUCTION_END_TIME);
            expect(auctionCreator).to.equal(CREATOR_ADDRESS);

            /* THE TEST GOES HERE */
            expect(
              await marketplace
                .connect(creator)
                .cancelAuction(NFT_ADDRESS, TOKEN_ID)
            ).to.be.revertedWith(AUCTION_ALREADY_STARTED);
            Promise.resolve();
          }
        );

        const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
        expect(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);

        const tx = await marketplace
          .connect(creator)
          .createAuction(
            NFT_ADDRESS,
            TOKEN_ID,
            TOKEN_PRICE,
            MINIMUM_BID,
            AUCTION_START_TIME,
            AUCTION_END_TIME
          );
        await tx.wait();
      });
    });
  });
});
