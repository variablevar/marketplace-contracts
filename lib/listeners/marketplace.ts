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
import { BidModel, NftModel, TokenModel, UserModel } from "../models";
import AcceptedNFTModel from "../models/accepted-nft";
import { TransactionType } from "../models/bid";
import BoughtNFTModel from "../models/bought-nft";
import CanceledOfferedNFTModel from "../models/canceled-offered-nft";
import CreatedAuctionModel from "../models/created-auction";
import ListedNFTModel from "../models/listed-nft";
import { Status } from "../models/nft";
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
        seller,
        price: Number(price),
        tokenId: Number(tokenId),
      });
      await listedNFT.save();
      const author = await UserModel.findOne({ wallet: seller });

      const tx = await BidModel.create({
        type: TransactionType.List,
        value: Number(price),
        author,
        nft: `${nft}/${tokenId}`,
      });

      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: { status: Status.BuyNow, price: Number(price), showcase: true },
          $push: { history: tx },
        }
      );
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
        price: Number(price),
        tokenId: Number(tokenId),
        seller,
        buyer,
      });
      await boughtNFT.save();

      const authorUser = await UserModel.findOne({ wallet: buyer });
      const sellerUser = await UserModel.findOne({ wallet: seller });
      await TokenModel.findOneAndUpdate(
        { address: nft, tokenId: Number(tokenId) },
        {
          $set: { owner: buyer },
        }
      );
      const tx = await BidModel.create({
        value: Number(price),
        author: authorUser,
        nft: `${nft}/${tokenId}`,
        type: TransactionType.Buy,
      });
      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: {
            status: Status.None,
            author: authorUser,
            priceover: Number(price),
          },
          $push: { history: tx },
        }
      );
      const updatedNFT = await NftModel.findOne({ id: `${nft}/${tokenId}` });
      if (authorUser && sellerUser && updatedNFT) {
        sellerUser.nfts.filter((nft) => nft.id === `${nft}/${tokenId}`);
        await sellerUser.save();
        authorUser.nfts.push(updatedNFT);
        await authorUser.save();
      }
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
        offerPrice: Number(offerPrice),
        tokenId: Number(tokenId),
        offerer,
      });
      await offeredNFT.save();

      const author = await UserModel.findOne({ wallet: offerer });
      const tx = await BidModel.create({
        value: Number(offerPrice),
        author,
        type: TransactionType.Offer,
        nft: `${nft}/${tokenId}`,
      });
      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: { status: Status.HasOffers, priceover: Number(offerPrice) },
          $push: { history: tx },
        }
      );
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
        offerPrice: Number(offerPrice),
        tokenId: Number(tokenId),
        offerer,
      });
      await canceledOfferedNFT.save();
      const author = await UserModel.findOne({ wallet: offerer });
      const tx = await BidModel.create({
        value: Number(offerPrice),
        author,
        type: TransactionType.CancelOffer,
        nft: `${nft}/${tokenId}`,
      });
      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: { status: Status.BuyNow, priceover: Number(offerPrice) },
          $push: { history: tx },
        }
      );
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
        offerPrice: Number(offerPrice),
        tokenId: Number(tokenId),
        offerer,
        nftOwner,
      });
      await acceptedNFT.save();
      await TokenModel.findOneAndUpdate(
        { address: nft, tokenId: Number(tokenId) },
        {
          $set: { owner: offerer },
        }
      );

      const authorUser = await UserModel.findOne({ wallet: offerer });
      const sellerUser = await UserModel.findOne({ wallet: nftOwner });

      const tx = await BidModel.create({
        value: Number(offerPrice),
        author: authorUser,
        type: TransactionType.AcceptOffer,
        nft: `${nft}/${tokenId}`,
      });
      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: {
            status: Status.None,
            priceover: Number(offerPrice),
            author: authorUser,
          },
          $push: { history: tx },
        }
      );
      const updatedNFT = await NftModel.findOne({ id: `${nft}/${tokenId}` });
      if (authorUser && sellerUser && updatedNFT) {
        sellerUser.nfts.filter((nft) => nft.id === `${nft}/${tokenId}`);
        await sellerUser.save();
        authorUser.nfts.push(updatedNFT);
        await authorUser.save();
      }
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
        tokenId: Number(tokenId),
        price: Number(price),
        minBid: Number(minBid),
        startTime: Number(startTime),
        endTime: Number(endTime),
        creator,
      });
      await createdAuction.save();
      const author = await UserModel.findOne({ wallet: creator });
      const tx = await BidModel.create({
        value: Number(price),
        author,
        type: TransactionType.Bid,
        nft: `${nft}/${tokenId}`,
      });
      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: {
            status: Status.OnAuction,
            priceover: Number(price),
            price: Number(price),
            start: Number(startTime),
            deadline: Number(endTime),
          },
          $push: { history: tx },
        }
      );
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

      const author = await UserModel.findOne({ wallet: bidder });
      const tx = await BidModel.create({
        value: Number(bidPrice),
        author,
        type: TransactionType.Bid,
        nft: `${nft}/${tokenId}`,
      });
      author?.bids.push(tx);
      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: {
            status: Status.OnAuction,
            priceover: Number(bidPrice),
            price: Number(bidPrice),
          },
          $push: { history: tx },
          $inc: { bid: 1, max_bid: 1 },
        }
      );
      author?.save();
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
      await TokenModel.findOneAndUpdate(
        { address: nft, tokenId: Number(tokenId) },
        {
          $set: { owner: winner },
        }
      );
      const authorUser = await UserModel.findOne({ wallet: winner });
      const sellerUser = await UserModel.findOne({ wallet: creator });

      const tx = await BidModel.create({
        value: Number(price),
        author: authorUser,
        type: TransactionType.Bid,
        nft: `${nft}/${tokenId}`,
      });
      await NftModel.findOneAndUpdate(
        { id: `${nft}/${tokenId}` },
        {
          $set: {
            status: Status.OnAuction,
            priceover: Number(price),
            price: Number(price),
            author: authorUser,
          },
          $push: { history: tx },
          $inc: { bid: 1, max_bid: 1 },
        }
      );
      const updatedNFT = await NftModel.findOne({ id: `${nft}/${tokenId}` });
      if (authorUser && sellerUser && updatedNFT) {
        sellerUser.nfts.filter((nft) => nft.id === `${nft}/${tokenId}`);
        await sellerUser.save();
        authorUser.nfts.push(updatedNFT);
        await authorUser.save();
      }
    }
  );

  console.log(
    `LISTENING START OF MARKETPLACE EVENTS AT ${MARKETPLACE_ADDRESS}`
  );
}
