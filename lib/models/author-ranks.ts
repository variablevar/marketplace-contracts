import mongoose, { Schema } from "mongoose";
import { AuthorSaleSchema, IAuthorSale } from "./author-sale";
import { AvatarSchema, IAvatar } from "./avatar";

export interface IAuthorRanks {
    id:           number;
    username:     string;
    social:       string;
    wallet:       string;
    followers:    number;
    bid:          number | null;
    author_sale:  IAuthorSale;
    about:        string;
    published_at: Date;
    created_at:   Date;
    updated_at:   Date;
    avatar:       IAvatar;
}


const AuthorRanksSchema: Schema<IAuthorRanks> = new Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    social: { type: String, required: true },
    wallet: { type: String, required: true },
    followers: { type: Number, required: true },
    bid: { type: Number, default: null },
    author_sale: { type: Schema.Types.ObjectId,ref:'AuthorSale', },
    about: { type: String, required: true },
    published_at: { type: Date, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    avatar: { type: AvatarSchema, required: true },
  });
  
  // Create and export the mongoose model
  export const AuthorRanksModel = mongoose.model<IAuthorRanks>('AuthorRanks', AuthorRanksSchema);