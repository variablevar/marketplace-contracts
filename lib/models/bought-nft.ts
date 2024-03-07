import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface IBoughtNFT extends Document {
  nft: string;
  tokenId: number;
  price: number;
  seller: string;
  buyer: string;
}

// Define the schema
const BoughtNFTSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  price: { type: Number, required: true },
  seller: { type: String, required: true },
  buyer: { type: String, required: true },
});

// Define and export the model
const BoughtNFTModel = mongoose.model<IBoughtNFT>("BoughtNFT", BoughtNFTSchema);
export default BoughtNFTModel;
