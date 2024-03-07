import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface IPlacedBid extends Document {
  nft: string;
  tokenId: number;
  bidPrice: number;
  bidder: string;
}

// Define the schema
const PlacedBidSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  bidPrice: { type: Number, required: true },
  bidder: { type: String, required: true },
});

// Define and export the model
const PlacedBidModel = mongoose.model<IPlacedBid>("PlacedBid", PlacedBidSchema);
export default PlacedBidModel;
