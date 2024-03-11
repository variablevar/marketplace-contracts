import mongoose, { Schema } from "mongoose";
import { EXT, IThumbnail, MIME, Provider, ThumbnailSchema } from "./avatar";
import { BidSchema, IBid } from "./bid";
import { IUser, UserSchema } from "./user";

export interface INft extends Document {
  id: number;
  unique_id?: string;
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
  preview_image: IPreviewImageClass;
  bids: IBid[];
  history: IBid[];
}

export interface IPreviewImageClass extends Document {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: IPreviewImageFormats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: string;
  provider: Provider;
  provider_metadata: string;
  created_at: Date;
  updated_at: Date;
}

export interface IPreviewImageFormats extends Document {
  thumbnail: IThumbnail;
  large?: IThumbnail;
  medium?: IThumbnail;
  small?: IThumbnail;
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

export const PreviewImageFormatsSchema: Schema<IPreviewImageFormats> =
  new Schema({
    thumbnail: { type: ThumbnailSchema, required: true },
    large: { type: ThumbnailSchema },
    medium: { type: ThumbnailSchema },
    small: { type: ThumbnailSchema },
  });

export const PreviewImageClassSchema: Schema<IPreviewImageClass> = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  alternativeText: { type: String, required: true },
  caption: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  formats: { type: PreviewImageFormatsSchema, required: true },
  hash: { type: String, required: true },
  ext: { type: String, enum: Object.values(EXT), required: true },
  mime: { type: String, enum: Object.values(MIME), required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  previewUrl: { type: String },
  provider: { type: String, enum: Object.values(Provider), required: true },
  provider_metadata: { type: String },
  created_at: {
    type: Date,
    default: Date.now // Set default value to current date and time
  },
  updated_at: {
    type: Date,
    default: Date.now // Set default value to current date and time
  },
});
export const PreviewImageClassModel = mongoose.model<IPreviewImageClass>(
  "PreviewImageClass",
  PreviewImageClassSchema
);

export const NftSchema: Schema<INft> = new Schema({
  id: { type: Number, required: true },
  unique_id: { type: String },
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
  nft_link: { type: String,  enum: Object.values(Link) },
  bid_link: { type: String, enum: Object.values(Link) },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  bid: { type: Number },
  max_bid: { type: Number },
  likes: { type: Number, required: true },
  description: { type: String, required: true },
  views: { type: Number, required: true },
  priceover: { type: Number },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  showcase: { type: Boolean },
  published_at: { type: Date, required: true },
  created_at: {
    type: Date,
    default: Date.now // Set default value to current date and time
  },
  updated_at: {
    type: Date,
    default: Date.now // Set default value to current date and time
  },
  preview_image: { type: Schema.Types.ObjectId, ref: 'PreviewImageClass', required: true },
  bids: {default:[],type:[{ type: Schema.Types.ObjectId, ref: 'Bid' }]},
  history: {default:[],type:[{ type: Schema.Types.ObjectId, ref: 'Bid' }]},
});

export const NftModel = mongoose.model<INft>("Nft", NftSchema);
