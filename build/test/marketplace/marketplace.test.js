"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const mocha_1 = require("mocha");
const typechain_types_1 = require("../../typechain-types");
function toWei(value) {
    return hardhat_1.ethers.parseEther(value.toString());
}
(0, mocha_1.describe)("INTEGRATION", () => {
    let nft;
    let NFT_ADDRESS;
    let factory;
    let FACTORY_ADDRESS;
    let marketplace;
    let MARKETPLACE_ADDRESS;
    let owner;
    let creator;
    let buyer;
    let offerer;
    let bidder1;
    let bidder2;
    const COLLECTION_NAME = "DEBIAN";
    const COLLECTION_SYMBOL = "DEB";
    const PLATFORM_FEE = 7;
    let ROYALTY_FEE = 2;
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
    const NFT_PRICES = [
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
    (0, mocha_1.before)(async () => {
        [owner, creator, buyer, offerer, bidder1, bidder2] =
            await hardhat_1.ethers.getSigners();
        const Factory = new typechain_types_1.NFTFactory__factory(owner);
        factory = await Factory.deploy();
        await factory.waitForDeployment();
        FACTORY_ADDRESS = factory.target;
        (0, chai_1.expect)(factory.target).not.eq(null, "Deploy NFT factory is failed.");
        const Marketplace = new typechain_types_1.NFTMarketplace__factory(owner);
        const feeRecipient = await owner.getAddress();
        marketplace = await Marketplace.deploy(PLATFORM_FEE, feeRecipient, factory.target);
        await marketplace.waitForDeployment();
        MARKETPLACE_ADDRESS = marketplace.target;
        (0, chai_1.expect)(marketplace.target).not.eq(null, "Deploy marketplace is failed.");
    });
    (0, mocha_1.describe)("DEPLOYMENT & TESTING OF NFT FACTORY", () => {
        (0, mocha_1.it)("IT SHOULD HAVE DEPLOYED SMART CONTRACTS", () => {
            (0, chai_1.expect)(FACTORY_ADDRESS).not.equal(null, "NFT FACTORY NOT DEPLOYED");
            (0, chai_1.expect)(MARKETPLACE_ADDRESS).not.equal(null, "NFT MARKETPLACE NOT DEPLOYED");
        });
        (0, mocha_1.it)("IT SHOULD CREATE NFT COLLECTION", async () => {
            const EVENT_NAME = "CreatedNFTCollection";
            const event = factory.getEvent(EVENT_NAME);
            factory.on(event, async function (creatorAddress, nftAddress, name, symbol, args) {
                (0, chai_1.expect)(creatorAddress).to.equal(await creator.getAddress());
                (0, chai_1.expect)(name).to.equal(COLLECTION_NAME);
                (0, chai_1.expect)(symbol).to.equal(COLLECTION_SYMBOL);
                NFT_ADDRESS = nftAddress;
                const contract = new typechain_types_1.NFT__factory(creator);
                nft = contract.attach(NFT_ADDRESS);
                Promise.resolve();
            });
            const tx = await factory
                .connect(creator)
                .createNFTCollection.send(COLLECTION_NAME, COLLECTION_SYMBOL, ROYALTY_FEE, creator);
            await tx.wait();
        });
        (0, mocha_1.it)("IT SHOULD GET OWNED COLLECTION", async () => {
            const collections = await factory.connect(creator).getOwnCollections();
            (0, chai_1.expect)(collections).to.deep.equal([NFT_ADDRESS]);
        });
        (0, mocha_1.it)("IT SHOULD CHECK THE NFT IS FACTORY NFT", async () => {
            const isFactoryNFT = await factory.isfactoryNFT(NFT_ADDRESS);
            const isNOTFactoryNFT = await factory.isfactoryNFT("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
            (0, chai_1.expect)(isFactoryNFT).to.be.true;
            (0, chai_1.expect)(isNOTFactoryNFT).to.be.false;
        });
    });
    (0, mocha_1.describe)("NFT COLLECTION", () => {
        (0, mocha_1.it)("IT SHOULD MINT NFT", async () => {
            const CREATOR_ADDRESS = await creator.getAddress();
            for (let index = 0; index < 10; index++) {
                const tx = await nft
                    .connect(creator)
                    .safeMint(CREATOR_ADDRESS, NFT_TOKENS_URI[index]);
                await tx.wait();
            }
            for (let index = 0; index < 10; index++) {
                const tokenURI = await nft.tokenURI(NFT_TOKENS[index]);
                (0, chai_1.expect)(tokenURI).to.equal(NFT_TOKENS_URI[index]);
                const tokenOwner = await nft.ownerOf(NFT_TOKENS[index]);
                (0, chai_1.expect)(tokenOwner).to.equal(CREATOR_ADDRESS);
            }
        });
        (0, mocha_1.it)("IT SHOULD APPROVE NFT TO OTHERS BEHALF OF OWNER TO MARKETPLACE", async () => {
            const CREATOR_ADDRESS = await creator.getAddress();
            for (let index = 0; index < 10; index++) {
                const tx = await nft
                    .connect(creator)
                    .approve(MARKETPLACE_ADDRESS, NFT_TOKENS[index]);
                await tx.wait();
            }
            for (let index = 0; index < 10; index++) {
                const tokenURI = await nft.tokenURI(NFT_TOKENS[index]);
                (0, chai_1.expect)(tokenURI).to.equal(NFT_TOKENS_URI[index]);
                const tokenOwner = await nft.ownerOf(NFT_TOKENS[index]);
                (0, chai_1.expect)(tokenOwner).to.equal(CREATOR_ADDRESS);
                const approved = await nft.getApproved(NFT_TOKENS[index]);
                (0, chai_1.expect)(approved).to.equal(MARKETPLACE_ADDRESS);
            }
        });
        (0, mocha_1.describe)("ROYALTIES", () => {
            (0, mocha_1.it)("IT SHOULD GET ROYALTIES RECEPIENT", async () => {
                const receiptent = await nft.getRoyaltyRecipient();
                (0, chai_1.expect)(receiptent).to.equal(await creator.getAddress());
            });
            (0, mocha_1.it)("IT SHOULD GET ROYALTIES", async () => {
                const royalty = await nft.getRoyaltyFee();
                (0, chai_1.expect)(royalty).to.equal(ROYALTY_FEE);
            });
            (0, mocha_1.it)("IT SHOULD CHANGE ROYALTIES", async () => {
                ROYALTY_FEE = 5;
                await nft.connect(creator).updateRoyaltyFee(ROYALTY_FEE);
                const royalty = await nft.getRoyaltyFee();
                (0, chai_1.expect)(royalty).to.equal(ROYALTY_FEE);
            });
        });
        /*  */
    });
    (0, mocha_1.describe)("MARKETPLACE", () => {
        (0, mocha_1.it)("IT SHOULD APPROVE NFT TO MARKETPLACE", async () => {
            for (let index = 0; index < 10; index++) {
                const tx = await nft
                    .connect(creator)
                    .approve(MARKETPLACE_ADDRESS, NFT_TOKENS[index]);
                await tx.wait();
            }
            for (let index = 0; index < 10; index++) {
                const approved = await nft.getApproved(NFT_TOKENS[index]);
                (0, chai_1.expect)(approved).to.be.equal(MARKETPLACE_ADDRESS);
            }
        });
        (0, mocha_1.describe)("MARKETPLACE LISTING", async () => {
            let CREATOR_ADDRESS;
            const TOKEN_ID = 0;
            (0, mocha_1.before)(async () => {
                CREATOR_ADDRESS = await creator.getAddress();
            });
            (0, mocha_1.it)("IT SHOULD LIST THE NFT TO MARKETPLACE", async () => {
                const CREATOR_ADDRESS = await creator.getAddress();
                const EVENT_NAME = "ListedNFT";
                const event = marketplace.getEvent(EVENT_NAME);
                marketplace.on(event, function (nfts, tokenId, price, seller) {
                    (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(NFT_TOKENS).to.include(tokenId);
                    (0, chai_1.expect)(NFT_PRICES).to.include(price);
                    (0, chai_1.expect)(seller).to.equal(CREATOR_ADDRESS);
                });
                for (let index = 0; index < 10; index++) {
                    const tx = await marketplace
                        .connect(creator)
                        .listNft(NFT_ADDRESS, NFT_TOKENS[index], NFT_PRICES[index]);
                    await tx.wait();
                }
            });
            (0, mocha_1.it)("IT SHOULD ALLOW USER TO CANCEL LIST OF NFT ON MARKETPLACE", async () => {
                (0, chai_1.expect)(await nft.ownerOf(TOKEN_ID)).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(creator)
                    .cancelListedNFT(NFT_ADDRESS, TOKEN_ID);
                await tx.wait();
                (0, chai_1.expect)(await nft.ownerOf(TOKEN_ID)).to.equal(CREATOR_ADDRESS);
            });
            (0, mocha_1.it)("IT SHOULD ALLOW USER TO RE-LIST NFT ON MARKETPLACE", async () => {
                (0, chai_1.expect)(await nft.ownerOf(TOKEN_ID)).to.equal(CREATOR_ADDRESS);
                /* ALLOW APPROVAL TO MARKETPLACE */
                await nft.connect(creator).approve(MARKETPLACE_ADDRESS, TOKEN_ID);
                /* LIST NFT */
                await marketplace
                    .connect(creator)
                    .listNft(NFT_ADDRESS, TOKEN_ID, NFT_PRICES[TOKEN_ID]);
                /* CHECK OWNERSHIP SINCE LISTED */
                (0, chai_1.expect)(await nft.ownerOf(TOKEN_ID)).to.equal(MARKETPLACE_ADDRESS);
                /* CANCEL LISTING */
                await marketplace
                    .connect(creator)
                    .cancelListedNFT(NFT_ADDRESS, TOKEN_ID);
                /* CHECK AFTER CANCEL LISTING OWNER OF TOKEN/NFT */
                (0, chai_1.expect)(await nft.ownerOf(TOKEN_ID)).to.equal(CREATOR_ADDRESS);
                NFT_PRICES[TOKEN_ID] = toWei(0.0002);
                /* RELIST */
                /* ALLOW APPROVAL TO MARKETPLACE */
                await nft.connect(creator).approve(MARKETPLACE_ADDRESS, TOKEN_ID);
                await marketplace
                    .connect(creator)
                    .listNft(NFT_ADDRESS, TOKEN_ID, NFT_PRICES[TOKEN_ID]);
                /* CHECK OWNERSHIP SINCE RE-LISTED */
                (0, chai_1.expect)(await nft.ownerOf(TOKEN_ID)).to.equal(MARKETPLACE_ADDRESS);
            });
            (0, mocha_1.it)("IT SHOULD RETERIVE THE LISTED ITEM FROM CHAIN", async () => {
                for (let index = 0; index < 10; index++) {
                    const listedNFT = await marketplace.getListedNFT(NFT_ADDRESS, NFT_TOKENS[index]);
                    (0, chai_1.expect)(listedNFT[0]).to.be.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(listedNFT[1]).to.be.equal(NFT_TOKENS[index]);
                    (0, chai_1.expect)(listedNFT[2]).to.be.equal(CREATOR_ADDRESS);
                    (0, chai_1.expect)(listedNFT[3]).to.be.equal(NFT_PRICES[index]);
                    (0, chai_1.expect)(listedNFT[4]).to.be.false;
                }
            });
        });
        (0, mocha_1.describe)("MARKETPLACE BUYING / PURCHASE", async () => {
            let CREATOR_ADDRESS;
            let BUYER_ADDRESS;
            const TOKEN_ID = 0;
            const NFT_PRICE = toWei(0.0002);
            (0, mocha_1.before)(async () => {
                CREATOR_ADDRESS = await creator.getAddress();
                BUYER_ADDRESS = await buyer.getAddress();
            });
            (0, mocha_1.it)("IT SHOULD ALLOW USER TO BUY LISTED NFT", async () => {
                const EVENT_NAME = "BoughtNFT";
                const event = marketplace.getEvent(EVENT_NAME);
                marketplace.on(event, function (nfts, tokenId, price, seller, buyer) {
                    (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(tokenId).to.equal(TOKEN_ID);
                    (0, chai_1.expect)(price).to.equal(NFT_PRICE);
                    (0, chai_1.expect)(seller).to.equal(CREATOR_ADDRESS);
                    (0, chai_1.expect)(buyer).to.equal(BUYER_ADDRESS);
                    Promise.resolve();
                });
                const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(buyer)
                    .buyNFT(NFT_ADDRESS, TOKEN_ID, { value: NFT_PRICE });
                await tx.wait();
                (0, chai_1.expect)(await nft.ownerOf(TOKEN_ID)).to.equal(BUYER_ADDRESS);
            });
        });
        (0, mocha_1.describe)("MARKETPLACE OFFERING", () => {
            let CREATOR_ADDRESS;
            let OFFERER_ADDRESS;
            const TOKEN_ID = 1;
            const OFFER_PRICE = NFT_PRICES[TOKEN_ID] + NFT_PRICES[TOKEN_ID]; // 2x
            (0, mocha_1.before)(async () => {
                CREATOR_ADDRESS = await creator.getAddress();
                OFFERER_ADDRESS = await offerer.getAddress();
            });
            (0, mocha_1.it)("IT ALLOW USER TO OFFER NFT OVER MARKETPLACE", async () => {
                const EVENT_NAME = "OfferredNFT";
                const event = marketplace.getEvent(EVENT_NAME);
                marketplace.on(event, function (nfts, tokenId, offerPrice, offerer) {
                    (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(tokenId).to.equal(TOKEN_ID);
                    (0, chai_1.expect)(offerPrice).to.equal(OFFER_PRICE);
                    (0, chai_1.expect)(offerer).to.equal(OFFERER_ADDRESS);
                    Promise.resolve();
                });
                const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(offerer)
                    .offerNFT(NFT_ADDRESS, TOKEN_ID, { value: OFFER_PRICE });
                await tx.wait();
            });
            (0, mocha_1.it)("IT SHOULD ALLOW USER TO CANCEL OFFER", async () => {
                const EVENT_NAME = "CanceledOfferredNFT";
                const event = marketplace.getEvent(EVENT_NAME);
                marketplace.on(event, function (nfts, tokenId, offerPrice, offerer) {
                    (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(tokenId).to.equal(TOKEN_ID);
                    (0, chai_1.expect)(offerPrice).to.equal(OFFER_PRICE);
                    (0, chai_1.expect)(offerer).to.equal(OFFERER_ADDRESS);
                    Promise.resolve();
                });
                const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(creator)
                    .cancelOfferNFT(NFT_ADDRESS, TOKEN_ID, OFFERER_ADDRESS);
                await tx.wait();
            });
            (0, mocha_1.it)("IT SHOULD ALLOW USER TO ACCEPT OFFER", async () => {
                const EVENT_NAME = "OfferredNFT";
                const event = marketplace.getEvent(EVENT_NAME);
                marketplace.on(event, async function (nfts, tokenId, offerPrice, offerer) {
                    (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(tokenId).to.equal(TOKEN_ID);
                    (0, chai_1.expect)(offerPrice).to.equal(OFFER_PRICE);
                    (0, chai_1.expect)(offerer).to.equal(OFFERER_ADDRESS);
                    const EVENT_NAME = "AcceptedNFT";
                    const event = marketplace.getEvent(EVENT_NAME);
                    marketplace.on(event, async function (nfts, tokenId, offerPrice, offerer, nftOwner) {
                        (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                        (0, chai_1.expect)(tokenId).to.equal(TOKEN_ID);
                        (0, chai_1.expect)(offerPrice).to.equal(OFFER_PRICE);
                        (0, chai_1.expect)(offerer).to.equal(OFFERER_ADDRESS);
                        (0, chai_1.expect)(nftOwner).to.equal(CREATOR_ADDRESS);
                        const newOwnerOfNFT = await nft.ownerOf(TOKEN_ID);
                        (0, chai_1.expect)(newOwnerOfNFT).to.equal(OFFERER_ADDRESS);
                        Promise.resolve();
                    });
                    const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                    (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                    const tx = await marketplace
                        .connect(creator)
                        .acceptOfferNFT(NFT_ADDRESS, TOKEN_ID, OFFERER_ADDRESS);
                    await tx.wait();
                });
                const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(offerer)
                    .offerNFT(NFT_ADDRESS, TOKEN_ID, { value: OFFER_PRICE });
                await tx.wait();
            });
        });
        (0, mocha_1.describe)("MARKETPLACE AUCTION", () => {
            let CREATOR_ADDRESS;
            let BIDDER_1_ADDRESS;
            let BIDDER_2_ADDRESS;
            let AUCTION_START_TIME = Date.now() / 1000 + 60;
            let AUCTION_END_TIME = Date.now() / 1000 + 600;
            const TOKEN_ID = 7;
            const TOKEN_PRICE = NFT_PRICES[TOKEN_ID];
            const MINIMUM_BID = toWei(0.0001);
            const AUCTION_ALREADY_STARTED = "AUCTION ALREADY STARTED";
            (0, mocha_1.before)(async () => {
                CREATOR_ADDRESS = await creator.getAddress();
                BIDDER_1_ADDRESS = await bidder1.getAddress();
                BIDDER_2_ADDRESS = await bidder2.getAddress();
            });
            xit("IT SHOULD ALLOW USER TO START AUCTION", async () => {
                const EVENT_NAME = "CreatedAuction";
                const event = marketplace.getEvent(EVENT_NAME);
                marketplace.on(event, function (nfts, tokenId, price, minimunBid, startTime, endTime, auctionCreator) {
                    (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(tokenId).to.equal(TOKEN_ID);
                    (0, chai_1.expect)(price).to.equal(TOKEN_PRICE);
                    (0, chai_1.expect)(minimunBid).to.equal(MINIMUM_BID);
                    (0, chai_1.expect)(startTime).to.equal(AUCTION_START_TIME);
                    (0, chai_1.expect)(endTime).to.equal(AUCTION_END_TIME);
                    (0, chai_1.expect)(auctionCreator).to.equal(CREATOR_ADDRESS);
                    Promise.resolve();
                });
                const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(creator)
                    .createAuction(NFT_ADDRESS, TOKEN_ID, TOKEN_PRICE, MINIMUM_BID, AUCTION_START_TIME, AUCTION_END_TIME);
                await tx.wait();
            });
            xit("IT SHOULD ALLOW USER TO STOP AUCTION BEFORE START", async () => {
                const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(creator)
                    .cancelAuction(NFT_ADDRESS, TOKEN_ID);
                await tx.wait();
                const newOwnerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(newOwnerOfNFT).to.equal(CREATOR_ADDRESS);
            });
            xit("IT SHOULD NOT ALLOW USER TO STOP AUCTION AFTER IT START", async () => {
                AUCTION_START_TIME = Date.now() / 1000;
                AUCTION_END_TIME = Date.now() / 1000 + 120;
                const EVENT_NAME = "CreatedAuction";
                const event = marketplace.getEvent(EVENT_NAME);
                marketplace.on(event, async function (nfts, tokenId, price, minimunBid, startTime, endTime, auctionCreator) {
                    (0, chai_1.expect)(nfts).to.equal(NFT_ADDRESS);
                    (0, chai_1.expect)(tokenId).to.equal(TOKEN_ID);
                    (0, chai_1.expect)(price).to.equal(TOKEN_PRICE);
                    (0, chai_1.expect)(minimunBid).to.equal(MINIMUM_BID);
                    (0, chai_1.expect)(startTime).to.equal(AUCTION_START_TIME);
                    (0, chai_1.expect)(endTime).to.equal(AUCTION_END_TIME);
                    (0, chai_1.expect)(auctionCreator).to.equal(CREATOR_ADDRESS);
                    /* THE TEST GOES HERE */
                    (0, chai_1.expect)(await marketplace
                        .connect(creator)
                        .cancelAuction(NFT_ADDRESS, TOKEN_ID)).to.be.revertedWith(AUCTION_ALREADY_STARTED);
                    Promise.resolve();
                });
                const ownerOfNFT = await nft.ownerOf(TOKEN_ID);
                (0, chai_1.expect)(ownerOfNFT).to.equal(MARKETPLACE_ADDRESS);
                const tx = await marketplace
                    .connect(creator)
                    .createAuction(NFT_ADDRESS, TOKEN_ID, TOKEN_PRICE, MINIMUM_BID, AUCTION_START_TIME, AUCTION_END_TIME);
                await tx.wait();
            });
        });
    });
});
