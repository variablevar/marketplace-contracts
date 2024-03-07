import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface IListedNFT extends Document {
  nft: string;
  tokenId: number;
  price: number;
  seller: string;
}

// Define the schema
const ListedNFTSchema: Schema = new Schema({
  nft: { type: String, required: true },
  tokenId: { type: Number, required: true },
  price: { type: Number, required: true },
  seller: { type: String, required: true },
});

// Define and export the model
const ListedNFTModel = mongoose.model<IListedNFT>("ListedNFT", ListedNFTSchema);
export default ListedNFTModel;
