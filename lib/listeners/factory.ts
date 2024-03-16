import { ethers } from "hardhat";
import { NFTFactory, NFTFactory__factory } from "../../typechain-types";
import { FACTORY_ADDRESS } from "../constants/address";
import { HotCollectionModel, UserModel } from "../models";
import NFTCollectionModel from "../models/nft-collection";
import { provider } from "./provider";
import { listenToken } from "./token";

export function listenFactory() {
  const contract = new ethers.Contract(
    FACTORY_ADDRESS,
    NFTFactory__factory.abi,
    provider
  );
  const factory = contract.attach(FACTORY_ADDRESS) as NFTFactory;

  const EVENT_NAME = "CreatedNFTCollection";
  const event = factory.getEvent(EVENT_NAME);

  factory.on(
    event,
    async function (
      creator: string,
      nft: string,
      name: string,
      image: string,
      symbol: string,
      args
    ) {
      const collection = new NFTCollectionModel({
        creator,
        nft,
        name,
        image,
        symbol,
      });
      const author = await UserModel.findOne({ wallet: creator });
      const hotCollection = new HotCollectionModel({
        id: nft,
        author,
        name: name,
        banner: image,
      });
      await collection.save();
      await hotCollection.save();
      author?.hot_collections.push(hotCollection);
      await author?.save();
      listenToken(nft);
    }
  );
  console.log(`LISTENING START OF NFT FACTORY EVENTS AT ${FACTORY_ADDRESS}`);
}
