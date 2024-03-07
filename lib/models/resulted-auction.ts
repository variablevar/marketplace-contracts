import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface IResultedAuction extends Document {
  nft: string;
  tokenId: number;
  creator: string;
  winner: string;
  price: number;
  caller: string;
}

// Define the schema
const ResultedAuctionSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  creator: { type: String, required: true },
  winner: { type: String, required: true },
  price: { type: Number, required: true },
  caller: { type: String, required: true },
});

// Define and export the model
const ResultedAuctionModel = mongoose.model<IResultedAuction>(
  "ResultedAuction",
  ResultedAuctionSchema
);
export default ResultedAuctionModel;
