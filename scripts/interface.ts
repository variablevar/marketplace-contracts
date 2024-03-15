import { BigNumberish, Signer } from "ethers";
import fs from "fs";
import { ethers } from "hardhat";
import path from "path";
import { NFTFactoryContract } from "../lib";
import { IMetadata } from "../lib/models/metadata";
import { NFT, NFT__factory } from "../typechain-types";
import { pinFileToIPFS } from "./helper/pinata";

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

async function accounts() {
  const signers = await ethers.getSigners();
  for (let index = 10; index < signers.length; index++) {
    console.log(signers[index].address);
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
    const receipt = tx.wait();
  } catch (error) {
    console.log(error);
  }
}
async function getTokenURI(metadata: IMetadata, imageFile: ImageFile) {}
async function createToken(
  collectionInfo: CollectionInfo,
  signer: Signer,
  address: string,
  tokenURI: string
) {
  try {
    const NFT = new NFT__factory(signer);
    const nft = NFT.attach(address) as NFT;

    const tx = await nft.connect(signer).safeMint.send(signer, tokenURI);
    const receipt = tx.wait();
  } catch (error) {
    console.log(error);
  }
}

resolveAllImages().then(() => console.log("Done"));
