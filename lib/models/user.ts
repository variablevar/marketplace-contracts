import mongoose, { Document, Schema } from 'mongoose';
import { AuthorSaleSchema, IAuthorSale } from './author-sale';
import { AvatarSchema, IAvatar } from './avatar';
import { BidSchema, IBid } from './bid';
import { INft, IPreviewImageClass, NftSchema, PreviewImageClassSchema } from './nft';
import { HotCollectionSchema, IHotCollection } from './hot-collection';


export interface IUser extends Document {
  id: number;
  username: string;
  social: string;
  wallet: string;
  followers: number;
  bid?: IBid ;
  author_sale: IAuthorSale;
  about: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  avatar: IAvatar;
  banner: IPreviewImageClass;
  nfts: INft[];
  hot_collections: IHotCollection[];
}

  export const UserSchema: Schema<IUser> = new Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    social: { type: String, required: true },
    wallet: { type: String, required: true },
    followers: { type: Number, required: true },
    bid: { type: BidSchema },
    author_sale: { type: AuthorSaleSchema, required: true },
    about: { type: String, required: true },
    published_at: { type: Date, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    avatar: { type: AvatarSchema, required: true },
    banner: { type: PreviewImageClassSchema, required: true },
    nfts: { type: [NftSchema], required: true },
    hot_collections: { type: [HotCollectionSchema], required: true },
  });



// Create and export the mongoose model
export const UserModel = mongoose.model<IUser>('User', UserSchema);
