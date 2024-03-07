import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface IOfferedNFT extends Document {
  nft: string;
  tokenId: number;
  offerPrice: number;
  offerer: string;
}

// Define the schema
const OfferedNFTSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  offerer: { type: String, required: true },
});

// Define and export the model
const OfferedNFTModel = mongoose.model<IOfferedNFT>(
  "OfferedNFT",
  OfferedNFTSchema
);
export default OfferedNFTModel;
