import mongoose, { Document, Schema } from "mongoose";
import { IMetadata } from "./metadata";

// Define interface for Token document
export interface IToken extends Document {
  address: string;
  tokenId: number;
  owner: string;
  creator: string;
  tokenURI: string;
  price: number;
  metadata: IMetadata;
}

// Define Mongoose schema for Token
const TokenSchema: Schema<IToken> = new Schema({
  address: { type: String, required: true },
  creator: { type: String, required: true },
  owner: { type: String, required: true },
  tokenId: { type: Number, required: true },
  metadata: { type: Schema.Types.ObjectId, ref: "Metadata", required: true },
  tokenURI: { type: String, required: true },
  price: { type: Number, default: 0 },
});

// Define and export the Token model
const TokenModel = mongoose.model<IToken>("TokenMetadata", TokenSchema);
export default TokenModel;
