import mongoose, { Schema } from "mongoose";
import { IUser } from "./user";
export interface IAuthorSale extends Document {
  address: string;
  sales: number;
  volume: number;
  daily_sales: number;
  weekly_sales: number;
  floor_price: number;
  owners: number;
  assets: number;
  author: IUser;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}

export const AuthorSaleSchema: Schema<IAuthorSale> = new Schema({
  address: { type: String },
  sales: { type: Number, required: true },
  volume: { type: Number, required: true },
  daily_sales: { type: Number, required: true },
  weekly_sales: { type: Number, required: true },
  floor_price: { type: Number, required: true },
  owners: { type: Number, required: true },
  assets: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId,ref:"User", required: true },
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
});

export const AuthorSaleModel = mongoose.model<IAuthorSale>(
  "AuthorSale",
  AuthorSaleSchema
);
