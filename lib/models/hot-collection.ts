import mongoose, { Schema } from "mongoose";
import { EXT, IThumbnail, MIME, Provider, ThumbnailSchema } from "./avatar";
import { IUser, UserSchema } from "./user";

export interface IPurpleFormats extends Document {
    thumbnail: IThumbnail;
    small?: IThumbnail;
  }

export interface IHotCollection extends Document {
    id: number;
    unique_id: string;
    author: IUser;
    name: string;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
    banner: IHotCollectionBanner;
  }

export interface IPurpleFormats extends Document {
  thumbnail: IThumbnail;
  small?: IThumbnail;
}

export interface IHotCollectionBanner extends Document {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: IPurpleFormats;
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

export const PurpleFormatsSchema: Schema<IPurpleFormats> = new Schema({
  thumbnail: { type: ThumbnailSchema, required: true },
  small: { type: ThumbnailSchema }
});

export const PurpleFormatsModel = mongoose.model<IPurpleFormats>('PurpleFormats', PurpleFormatsSchema);

export const HotCollectionBannerSchema: Schema<IHotCollectionBanner> = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  alternativeText: { type: String, required: true },
  caption: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  formats: { type: Schema.Types.ObjectId, ref: 'PurpleFormats', required: true },
  hash: { type: String, required: true },
  ext: { type: String, enum: Object.values(EXT), required: true },
  mime: { type: String, enum: Object.values(MIME), required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  previewUrl: { type: String },
  provider: { type: String, enum: Object.values(Provider), required: true },
  provider_metadata: { type: String },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

export const HotCollectionBannerModel = mongoose.model<IHotCollectionBanner>('HotCollectionBanner', HotCollectionBannerSchema);

export const HotCollectionSchema: Schema = new Schema({
  id: { type: Number, required: true },
  unique_id: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  published_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  banner: { type: Schema.Types.ObjectId, ref: 'HotCollectionBanner', required: true },
});

  const HotCollectionModel = mongoose.model<IHotCollection>("HotCollection", HotCollectionSchema);
  export default HotCollectionModel;