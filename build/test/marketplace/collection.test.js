"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const mocha_1 = require("mocha");
const typechain_types_1 = require("../../typechain-types");
function toWei(value) {
    return hardhat_1.ethers.parseEther(value.toString());
}
(0, mocha_1.describe)("Marketplace", () => {
    let nft;
    let NFT_ADDRESS;
    let CREATOR_ADDRESS;
    let owner;
    let creator;
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
    (0, mocha_1.before)(async () => {
        [owner, creator] = await hardhat_1.ethers.getSigners();
        CREATOR_ADDRESS = await creator.getAddress();
        const NFT = new typechain_types_1.NFT__factory(creator);
        nft = await NFT.deploy(COLLECTION_NAME, COLLECTION_SYMBOL, CREATOR_ADDRESS, ROYALTY_FEE, CREATOR_ADDRESS);
        await nft.waitForDeployment();
        NFT_ADDRESS = nft.target;
        (0, chai_1.expect)(nft.target).not.eq(null, "Deploy NFT factory is failed.");
    });
    (0, mocha_1.describe)("NFT COLLECTION", () => {
        (0, mocha_1.it)("IT SHOULD MINT NFT", async () => {
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
            for (let index = 0; index < 10; index++) {
                const tx = await nft
                    .connect(creator)
                    .approve(NFT_ADDRESS, NFT_TOKENS[index]);
                await tx.wait();
            }
            for (let index = 0; index < 10; index++) {
                const tokenURI = await nft.tokenURI(NFT_TOKENS[index]);
                (0, chai_1.expect)(tokenURI).to.equal(NFT_TOKENS_URI[index]);
                const tokenOwner = await nft.ownerOf(NFT_TOKENS[index]);
                (0, chai_1.expect)(tokenOwner).to.equal(CREATOR_ADDRESS);
                const approved = await nft.getApproved(NFT_TOKENS[index]);
                (0, chai_1.expect)(approved).to.equal(NFT_ADDRESS);
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
});
