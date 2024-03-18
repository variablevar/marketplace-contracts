import mongoose, { Schema } from "mongoose";
import { IBid } from "./bid";
import { IHotCollection } from "./hot-collection";
import { IMetadata } from "./metadata";
import { IUser } from "./user";

export interface INft extends Document {
  id: string;
  tokenId?: string;
  category: Category;
  status: Status;
  item_type: ItemType;
  hot_collections: IHotCollection;
  start?: Date;
  deadline?: Date;
  author_link: string;
  nft_link?: string;
  bid_link: string;
  title: string;
  price: number;
  bid?: number;
  max_bid?: number;
  likes: number;
  description: string;
  views: number;
  priceover?: number;
  author?: IUser;
  owner?: IUser;
  showcase?: boolean;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  preview_image: string;
  metadata: IMetadata;
  bids: IBid[];
  history: IBid[];
}

export enum AuthorLink {
  Author = "/author",
}

export enum Link {
  ItemDetail = "/item-detail",
}

export enum Category {
  ART = "art",
  MUSIC = "music",
  DOMAIN_NAMES = "domain_names",
  VIRTUAL_WORLD = "virtual_world",
  TRADING_CARDS = "trading_cards",
  COLLECTIBLES = "collectibles",
  SPORTS = "sports",
  UTILITY = "utility",
}
export enum Collections {
  Abstraction = "abstraction",
  Cartoonism = "cartoonism",
}

export enum ItemType {
  Bundles = "bundles",
  SingleItems = "single_items",
}

export enum Status {
  None = "none",
  BuyNow = "buy_now",
  HasOffers = "has_offers",
  OnAuction = "on_auction",
}

export const NftSchema: Schema<INft> = new Schema({
  id: { type: String, required: true, unique: true },
  tokenId: { type: String, required: true },
  category: { type: String, enum: Object.values(Category), required: true },
  status: { type: String, enum: Object.values(Status), required: true },
  item_type: { type: String, enum: Object.values(ItemType), required: true },
  hot_collections: {
    type: Schema.Types.ObjectId,
    ref: "HotCollection",
    required: true,
  },
  deadline: { type: Date },
  author_link: {
    type: String,
    required: true,
  },
  nft_link: { type: String, required: true },
  bid_link: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  bid: { type: Number },
  max_bid: { type: Number },
  likes: { type: Number, required: true },
  description: { type: String, required: true },
  views: { type: Number, required: true },
  priceover: { type: Number },
  metadata: { type: Schema.Types.ObjectId, ref: "Metadata", required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  showcase: { type: Boolean },
  published_at: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  created_at: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  updated_at: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  preview_image: {
    type: String,
    required: true,
    default: "",
  },
  bids: { default: [], type: [{ type: Schema.Types.ObjectId, ref: "Bid" }] },
  history: { default: [], type: [{ type: Schema.Types.ObjectId, ref: "Bid" }] },
});

export const NftModel = mongoose.model<INft>("Nft", NftSchema);
