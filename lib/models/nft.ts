import mongoose, { Schema } from "mongoose";
import { IBid } from "./bid";
import { IUser } from "./user";

export interface INft extends Document {
  id: number;
  tokenId?: string;
  category: Category;
  status: Status;
  item_type: ItemType;
  collections: Collections;
  deadline?: Date;
  author_link: AuthorLink;
  nft_link?: Link;
  bid_link: Link;
  title: string;
  price: number;
  bid?: number;
  max_bid?: number;
  likes: number;
  description: string;
  views: number;
  priceover?: number;
  author?: IUser;
  showcase?: boolean;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  preview_image: string;
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
  Art = "art",
  Collectibles = "collectibles",
  Music = "music",
  VirtualWorld = "virtual_world",
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
  BuyNow = "buy_now",
  HasOffers = "has_offers",
  OnAuction = "on_auction",
}

export const NftSchema: Schema<INft> = new Schema({
  id: { type: Number, required: true },
  tokenId: { type: String, required: true },
  category: { type: String, enum: Object.values(Category), required: true },
  status: { type: String, enum: Object.values(Status), required: true },
  item_type: { type: String, enum: Object.values(ItemType), required: true },
  collections: {
    type: String,
    enum: Object.values(Collections),
    required: true,
  },
  deadline: { type: Date },
  author_link: {
    type: String,
    enum: Object.values(AuthorLink),
    required: true,
  },
  nft_link: { type: String, enum: Object.values(Link) },
  bid_link: { type: String, enum: Object.values(Link) },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  bid: { type: Number },
  max_bid: { type: Number },
  likes: { type: Number, required: true },
  description: { type: String, required: true },
  views: { type: Number, required: true },
  priceover: { type: Number },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  showcase: { type: Boolean },
  published_at: { type: Date, required: true },
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
