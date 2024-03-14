import axios from "axios";
import { ethers } from "hardhat";
import { NFT, NFT__factory } from "../../typechain-types";
import { MetadataModel, NftModel, TokenModel, UserModel } from "../models";
import { Category, ItemType, Status } from "../models/nft";
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
      const response = await axios.get(tokenURI);
      const metadataJSON = response.data;

      const metadata = await MetadataModel.create({
        ...metadataJSON,
        tokenId: parseInt(tokenId.toString()),
      });
      const author = await UserModel.findOne({ wallet: creator });
      await TokenModel.create({
        address,
        creator,
        owner: creator,
        tokenURI,
        tokenId: parseInt(tokenId.toString()),
        metadata: metadata,
      });
      await NftModel.create({
        id: `${address}/${tokenId}`,
        tokenId: metadata.tokenId,
        category: Category.Art,
        status: Status.None,
        item_type: ItemType.SingleItems,
        collections: metadata.collection_name,
        start: new Date(0),
        deadline: new Date(0),
        author_link: `/author/${creator}`,
        nft_link: `/item-detail/${address}/${tokenId}`,
        bid_link: `/item-detail/${address}/${tokenId}`,
        title: metadata.name,
        price: 0,
        bid: 0,
        max_bid: 0,
        likes: 0,
        description: metadata.description,
        views: 0,
        priceover: 0,
        author,
        showcase: false,
        preview_image: metadata.image,
      });
    }
  );
  console.log(`LISTENING START ON TOKEN AT ${address}`);
}
