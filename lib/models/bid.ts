import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IBid extends Document {
    id: number;
    value: number;
    nft: number;
    author: number;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
  }


export const BidSchema: Schema<IBid> = new Schema({
    id: { type: Number, required: true },
    value: { type: Number, required: true },
    nft: { type: Number, required: true },
    author: { type: Number, required: true },
    published_at: { type: Date, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  });

  export const BidModel = mongoose.model<IBid>("Bid", BidSchema);
