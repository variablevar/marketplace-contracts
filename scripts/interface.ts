import { BigNumberish, Signer } from "ethers";
import fs from "fs";
import { ethers } from "hardhat";
import path from "path";
import { NFTFactoryContract } from "../lib";
import images from "./../mock/0-cids.json";
import nfts from "./../mock/nfts/nfts.json";

import mockNfts from "./../mock/MOCK_DATA.json";
import mockCollections from "./../mock/MOCK_DATA_COLLECTION.json";

import { NFT, NFT__factory } from "../typechain-types";
import { pinFileToIPFS } from "./helper/pinata";

const collectionsImages = images.slice(1000, 1025);
const nftImages = images.slice(2000, 2500);
const users: Signer[] = [];
const collectionsAddresses = [
  "0x6De0B8e6d2BAc4780c114f4e1b3330ce86bE7eb6",
  "0x00A2A745d2b33C1e1b26976e2794038f85e4BE63",
  "0x46868AE7Ef3a805d6E729f2BCfeC3CA38a8b169F",
  "0x20ff2903EbDD0D04A2717Ce11E41168dD5e30A55",
  "0xD4CBae059740d0ef535DB34f38D24B625dd3917D",
  "0xd7fA7D7B53f4E2C932290A572273fe6909d05ADB",
  "0x740aD8Bf420FD737a4c002661D84cBa7Eb3AbEbF",
  "0xC1f9b143dCCF027E98170aCf6c369851Ea3f854c",
  "0x7ceCcE2df8Ce8D9F383fC6A92f745Cf340036B8B",
  "0x23DBf390E77389da2fBF016ACfF42E001c852875",
  "0x5427eCEBfbe11EC0e45CD25B2215D32E589d1152",
  "0xE336B71226D840bD7A1Cc3dFE4e326611788E174",
  "0xc425C59e9669239d77c8c37dFFE530F71A1b4A60",
  "0x5fFcdF4Af3C76db8B111A64d1f528156E58d3b6c",
  "0x9bd80713F626EE068a74A821F58F00A7C3F1975c",
  "0xe367BD403d41297235E0815d4840a77e061923D1",
  "0xe51A854de528e9b239bdb9803CE86eBFBCFB3891",
  "0xb5E5edfC9341c356B0428aC1f862BddCC57B0ABa",
  "0xe359C44E12ef8bb8C8FBA80649449d7Ab4aB618D",
  "0x3FD0F2344a07d1FAF60cB0d2D9e7Ea4b65125f5a",
  "0x3D6c5FfF83d3f7b9084324e3423Ed4b32A5caFDe",
  "0xAa412F7E7746c00c0073494fA6EB74C7bD12E0a9",
  "0x2dc885D9dA941dd35F0757f9b027505244C8658e",
  "0xac9eaa5Bd6ED55D0C6663CBF7b5101Fa99B486C6",
  "0x5f628A6d58d6d179fB9067b483dEe4e0D386D275",
];

interface ImageFile {
  filename: string;
  pinataUrl: string;
}
interface CollectionInfo {
  collectionName: string;
  collectionSymbol: string;
  collectionImage: string;
  royaltyFee: number;
  creator: string;
}

async function fetchAccounts() {
  const signers = await ethers.getSigners();
  for (let index = 10; index < signers.length; index++) {
    users.push(signers[index]);
  }
}

async function resolveAllImages() {
  const savedFileName = "images.json";
  const contents: ImageFile[] = [];
  const files = fs.readdirSync(path.resolve(__dirname, "..", "bundles"));
  for (let index = 0; index < files.length; index++) {
    try {
      const filename = files[index];
      const formData = new FormData();
      const file = fs.readFileSync(
        path.resolve(__dirname, "..", "bundles", filename)
      );
      formData.append("file", new Blob([file]));
      const { pinataUrl } = await pinFileToIPFS(formData);

      if (pinataUrl) {
        const file = {
          filename,
          pinataUrl,
        };
        contents.push(file);
      } else {
        console.log("NOT PUBLISHING " + filename);
      }
    } catch (error) {
      console.log("ERROR WHILE PUBLISHING ", error);
    }
  }
  const saved = fs.writeFileSync(
    path.resolve(__dirname, "..", "mock", savedFileName),
    JSON.stringify(contents)
  );
}

async function createCollection(
  collectionInfo: CollectionInfo,
  signer: Signer
) {
  try {
    const tx = await NFTFactoryContract.connect(
      signer
    ).createNFTCollection.send(
      collectionInfo.collectionName,
      collectionInfo.collectionSymbol,
      collectionInfo.collectionImage,
      (collectionInfo.royaltyFee * 1000) as BigNumberish,
      signer
    );
    const receipt = await tx.wait();
  } catch (error) {
    console.log(error);
  }
}
async function createTokenJSON() {
  for (let index = 0; index < mockCollections.length; index++) {
    for (let nftIndex = 20 * index; nftIndex < 20 * (index + 1); nftIndex++) {
      const nft = mockNfts[nftIndex] as any;
      nft.image = getIpfsPinataURL(nftImages[index].cid);
      nft.animation_url = getIpfsPinataURL(nftImages[index].cid);
      nft.external_url = getIpfsPinataURL(nftImages[index].cid);
      nft.collection_address = collectionsAddresses[index];
      nft.collection_name = mockCollections[index].collectionName;

      fs.writeFileSync(
        path.resolve(__dirname, "..", "mock", "nfts", `nft-${nftIndex}.json`),
        JSON.stringify(nft)
      );
    }
  }
}

async function mintTokens() {
  const owners = [];
  const signers = [];
  for (let index = 0; index < mockCollections.length; index++) {
    const signer = users[index];
    const address = collectionsAddresses[index];
    for (let nftIndex = 20 * index; nftIndex < 20 * (index + 1); nftIndex++) {
      const contract = new NFT__factory(signer);

      const collectionContract = contract.attach(address) as NFT;

      const owneAddress = await collectionContract.owner();
      const owner = await ethers.getSigner(owneAddress);
      const tx = await collectionContract
        .connect(owner)
        .safeMint(owner, getIpfsURL(nfts[nftIndex].cid));
      const receipt = await tx.wait();
    }
  }
}

async function createNFTCollectionJSON() {
  for (let index = 0; index < mockCollections.length; index++) {
    const collection = mockCollections[index];
    collection.collectionImage = getIpfsPinataURL(collectionsImages[index].cid);

    await createCollection(collection, users[index]);
  }
}

function sortFilenames(files: any[]) {
  files.sort((a, b) => {
    const aNum = parseInt(a.filename.match(/\d+/)[0]);
    const bNum = parseInt(b.filename.match(/\d+/)[0]);
    return aNum - bNum;
  });
}

function getIpfsPinataURL(cid: string) {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

function getIpfsURL(cid: string) {
  return `https://ipfs.io/ipfs/${cid}`;
}

fetchAccounts().then(async () => {
  // await createNFTCollectionJSON();
  await mintTokens();
});
