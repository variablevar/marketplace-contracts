import mongoose, { Schema } from "mongoose";


export interface IAuthorSale extends Document {
  id: number;
  sales: number;
  volume: number;
  daily_sales: number;
  weekly_sales: number;
  floor_price: number;
  owners: number;
  assets: number;
  author: number;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}



export const AuthorSaleSchema: Schema<IAuthorSale> = new Schema({
  id: { type: Number, required: true },
  sales: { type: Number, required: true },
  volume: { type: Number, required: true },
  daily_sales: { type: Number, required: true },
  weekly_sales: { type: Number, required: true },
  floor_price: { type: Number, required: true },
  owners: { type: Number, required: true },
  assets: { type: Number, required: true },
  author: { type: Number, required: true },
  published_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

export const AuthorRanksModel = mongoose.model<IAuthorSale>('AuthorSale', AuthorSaleSchema);
