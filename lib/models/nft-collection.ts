import mongoose, { Document, Schema } from "mongoose";

// Define export interface for the document
export interface INFTCollection extends Document {
  creator: string;
  nft: string;
  name: string;
  image: string;
  symbol: string;
}

// Define the schema
const NFTCollectionSchema: Schema = new Schema({
  creator: { type: String, required: true },
  nft: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  symbol: { type: String, required: true },
});

// Define and export the model
const NFTCollectionModel = mongoose.model<INFTCollection>(
  "NFTCollection",
  NFTCollectionSchema
);
export default NFTCollectionModel;
