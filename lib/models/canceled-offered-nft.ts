import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface ICanceledOfferedNFT extends Document {
  nft: string;
  tokenId: number;
  offerPrice: number;
  offerer: string;
}

// Define the schema
const CanceledOfferedNFTSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  offerer: { type: String, required: true },
});

// Define and export the model
const CanceledOfferedNFTModel = mongoose.model<ICanceledOfferedNFT>(
  "CanceledOfferedNFT",
  CanceledOfferedNFTSchema
);
export default CanceledOfferedNFTModel;
