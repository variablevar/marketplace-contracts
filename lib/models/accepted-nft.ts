import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface IAcceptedNFT extends Document {
  nft: string;
  tokenId: number;
  offerPrice: number;
  offerer: string;
  nftOwner: string;
}

// Define the schema
const AcceptedNFTSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  offerer: { type: String, required: true },
  nftOwner: { type: String, required: true },
});

// Define and export the model
const AcceptedNFTModel = mongoose.model<IAcceptedNFT>(
  "AcceptedNFT",
  AcceptedNFTSchema
);
export default AcceptedNFTModel;
