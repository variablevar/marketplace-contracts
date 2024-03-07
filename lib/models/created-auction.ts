import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface ICreatedAuction extends Document {
  nft: string;
  tokenId: number;
  price: number;
  minBid: number;
  startTime: number;
  endTime: number;
  creator: string;
}

// Define the schema
const CreatedAuctionSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  price: { type: Number, required: true },
  minBid: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  creator: { type: String, required: true },
});

// Define and export the model
const CreatedAuctionModel = mongoose.model<ICreatedAuction>(
  "CreatedAuction",
  CreatedAuctionSchema
);
export default CreatedAuctionModel;
