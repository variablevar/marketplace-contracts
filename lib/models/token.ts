import mongoose, { Document, Schema } from "mongoose";

// Define interface for Token document
export interface IToken extends Document {
  address: string;
  tokenId: number;
  tokenURI: string;
}

// Define Mongoose schema for Token
const TokenSchema: Schema = new Schema({
  address: { type: String, required: true },
  tokenId: { type: Number, required: true },
  tokenURI: { type: String, required: true },
});

// Define and export the Token model
const TokenModel = mongoose.model<IToken>("Token", TokenSchema);
export default TokenModel;
