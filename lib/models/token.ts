import mongoose, { Document, Schema } from "mongoose";
import { IMetadata } from "./metadata";

// Define interface for Token document
export interface IToken extends Document {
  address: string;
  creator: string;
  tokenId: number;
  tokenURI: string;
  metadata: IMetadata;
}

// Define Mongoose schema for Token
const TokenSchema: Schema<IToken> = new Schema({
  address: { type: String, required: true },
  creator: { type: String, required: true },
  tokenId: { type: Number, required: true },
  metadata: { type: Schema.Types.ObjectId, ref: "Metadata", required: true },
  tokenURI: { type: String, required: true },
});

// Define and export the Token model
const TokenModel = mongoose.model<IToken>("TokenMetadata", TokenSchema);
export default TokenModel;
