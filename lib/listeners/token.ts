import { ethers } from "hardhat";
import { NFT, NFT__factory } from "../../typechain-types";
import { MetadataModel, TokenModel } from "../models";
import NFTCollectionModel from "../models/nft-collection";
import { provider } from "./provider";

export async function listenEveryCollectionWhichIsCreated() {
  const collections = await NFTCollectionModel.find();
  for (let index = 0; index < collections.length; index++) {
    const collection = collections[index];
    listenToken(collection.nft);
  }
}

export function listenToken(address: string) {
  const contract = new ethers.Contract(address, NFT__factory.abi, provider);
  const token = contract.attach(address) as NFT;

  const EVENT_NAME = "Minted";
  const event = token.getEvent(EVENT_NAME);

  token.on(
    event,
    async function (creator: string, tokenURI: string, tokenId: bigint, args) {
      const response = await fetch(tokenURI);
      const metadataJSON = await response.json();

      const metadata = await MetadataModel.create({
        ...metadataJSON,
        tokenId: parseInt(tokenId.toString()),
      });
      const collection = await TokenModel.create({
        address,
        creator,
        tokenURI,
        tokenId: parseInt(tokenId.toString()),
        metadata: metadata,
      });
    }
  );
  console.log(`LISTENING START ON TOKEN AT ${address}`);
}
