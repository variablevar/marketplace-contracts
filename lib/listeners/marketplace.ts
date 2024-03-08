import { ethers } from "hardhat";
import { NFTMarketplace, NFTMarketplace__factory } from "../../typechain-types";
import { MARKETPLACE_ADDRESS } from "../constants/address";
import {
  ACCEPTED_NFT_EVENT,
  BOUGHT_NFT_EVENT,
  CANCELED_OFFERED_NFT_EVENT,
  CREATED_AUCTION_EVENT,
  LISTED_NFT_EVENT,
  OFFERED_NFT_EVENT,
  PLACED_BID_EVENT,
  RESULTED_AUCTION_EVENT,
} from "../constants/events";
import AcceptedNFTModel from "../models/accepted-nft";
import BoughtNFTModel from "../models/bought-nft";
import CanceledOfferedNFTModel from "../models/canceled-offered-nft";
import CreatedAuctionModel from "../models/created-auction";
import ListedNFTModel from "../models/listed-nft";
import OfferedNFTModel from "../models/offered-nft";
import PlacedBidModel from "../models/placed-bid";
import ResultedAuctionModel from "../models/resulted-auction";
import { provider } from "./provider";

export function listenMarketplace() {
  const contract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    NFTMarketplace__factory.abi,
    provider
  );
  const marketplace = contract.attach(MARKETPLACE_ADDRESS) as NFTMarketplace;
  const eventListedNFT = marketplace.getEvent(LISTED_NFT_EVENT);

  marketplace.on(
    eventListedNFT,
    async function (
      nft: string,
      tokenId: bigint,
      price: bigint,
      seller: string
    ) {
      const listedNFT = new ListedNFTModel({
        nft,
        tokenId,
        price,
        seller,
      });
      await listedNFT.save();
    }
  );

  const eventBoughtNFT = marketplace.getEvent(BOUGHT_NFT_EVENT);

  marketplace.on(
    eventBoughtNFT,
    async function (
      nft: string,
      tokenId: bigint,
      price: bigint,
      seller: string,
      buyer: string
    ) {
      const boughtNFT = new BoughtNFTModel({
        nft,
        tokenId,
        price,
        seller,
        buyer,
      });
      await boughtNFT.save();
    }
  );

  const eventOfferedNFT = marketplace.getEvent(OFFERED_NFT_EVENT);

  marketplace.on(
    eventOfferedNFT,
    async function (
      nft: string,
      tokenId: bigint,
      offerPrice: bigint,
      offerer: string
    ) {
      const offeredNFT = new OfferedNFTModel({
        nft,
        tokenId,
        offerPrice,
        offerer,
      });
      await offeredNFT.save();
    }
  );

  const eventCanceledOfferredNFT = marketplace.getEvent(
    CANCELED_OFFERED_NFT_EVENT
  );

  marketplace.on(
    eventCanceledOfferredNFT,
    async function (
      nft: string,
      tokenId: bigint,
      offerPrice: bigint,
      offerer: string
    ) {
      const canceledOfferedNFT = new CanceledOfferedNFTModel({
        nft,
        tokenId,
        offerPrice,
        offerer,
      });
      await canceledOfferedNFT.save();
    }
  );

  const eventAcceptedNFT = marketplace.getEvent(ACCEPTED_NFT_EVENT);

  marketplace.on(
    eventAcceptedNFT,
    async function (
      nft: string,
      tokenId: bigint,
      offerPrice: bigint,
      offerer: string,
      nftOwner: string
    ) {
      const acceptedNFT = new AcceptedNFTModel({
        nft,
        tokenId,
        offerPrice,
        offerer,
        nftOwner,
      });
      await acceptedNFT.save();
    }
  );

  const eventCreatedAuction = marketplace.getEvent(CREATED_AUCTION_EVENT);

  marketplace.on(
    eventCreatedAuction,
    async function (
      nft: string,
      tokenId: bigint,
      price: bigint,
      minBid: bigint,
      startTime: bigint,
      endTime: bigint,
      creator: string
    ) {
      const createdAuction = new CreatedAuctionModel({
        nft,
        tokenId,
        price,
        minBid,
        startTime,
        endTime,
        creator,
      });
      await createdAuction.save();
    }
  );

  const eventPlacedBid = marketplace.getEvent(PLACED_BID_EVENT);

  marketplace.on(
    eventPlacedBid,
    async function (
      nft: string,
      tokenId: bigint,
      bidPrice: bigint,
      bidder: string
    ) {
      const placedBid = new PlacedBidModel({
        nft,
        tokenId,
        bidPrice,
        bidder,
      });
      await placedBid.save();
    }
  );

  const eventResultedAuction = marketplace.getEvent(RESULTED_AUCTION_EVENT);

  marketplace.on(
    eventResultedAuction,
    async function (
      nft: string,
      tokenId: bigint,
      creator: string,
      winner: string,
      price: bigint,
      caller: string
    ) {
      const resultedAuction = new ResultedAuctionModel({
        nft,
        tokenId,
        creator,
        winner,
        price,
        caller,
      });
      await resultedAuction.save();
    }
  );

  console.log(
    `LISTENING START OF MARKETPLACE EVENTS AT ${MARKETPLACE_ADDRESS}`
  );
}
