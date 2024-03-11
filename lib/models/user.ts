import mongoose, { Document, Schema } from 'mongoose';
import { AuthorSaleSchema, IAuthorSale } from './author-sale';
import { AvatarSchema, IAvatar } from './avatar';
import { BidSchema, IBid } from './bid';
import { INft, IPreviewImageClass, NftSchema, PreviewImageClassSchema } from './nft';
import { HotCollectionSchema, IHotCollection } from './hot-collection';


export interface IUser extends Document {
  username: string;
  password:string;
  email: string;
  wallet: string;
  followers?: number;
  bid?: IBid ;
  author_sale?: IAuthorSale;
  about?: string;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  avatar?: IAvatar;
  banner?: IPreviewImageClass;
  nfts?: INft[];
  hot_collections?: IHotCollection[];
}

  export const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    wallet: { type: String, default : '' },
    followers: { type: Number, default: 0 },
    bid: { type: BidSchema },
    author_sale: { type: AuthorSaleSchema },
    about: { type: String, default: ''},
    published_at: {
      type: Date,
      default: Date.now // Set default value to current date and time
    },
    created_at: {
      type: Date,
      default: Date.now // Set default value to current date and time
    },
    updated_at: {
      type: Date,
      default: Date.now // Set default value to current date and time
    },
    avatar: { type: AvatarSchema, default: {}},
    banner: { type: PreviewImageClassSchema, default: {} },
    nfts: { type: [NftSchema], default: [] },
    hot_collections: { type: [HotCollectionSchema], default: [] },
  });



// Create and export the mongoose model
export const UserModel = mongoose.model<IUser>('User', UserSchema);
