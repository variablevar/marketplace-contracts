import mongoose, { Document, Schema } from "mongoose";
import { Category, ItemType } from "./nft";

interface IAttribute {
  trait_type: string;
  value: string;
}

interface IMetadata extends Document {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: IAttribute[];
  animation_url: string;
  tokenId: number;
  category: Category;
  item_type:ItemType;
  background_color: string;
  collection_address: string;
  collection_name: string;
}

const AttributeSchema = new Schema<IAttribute>({
  trait_type: { type: String, required: true },
  value: { type: String, required: true },
});

const MetadataSchema = new Schema<IMetadata>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  external_url: { type: String, required: true },
  tokenId: { type: Number, required: true },
  item_type:{ type: String, enum: Object.values(ItemType), required: true },
  category: { type: String, enum: Object.values(Category), required: true },
  attributes: [AttributeSchema],
  animation_url: { type: String, required: true },
  background_color: { type: String, required: true },
  collection_address: { type: String, required: true },
  collection_name: { type: String, required: true },
});

const MetadataModel = mongoose.model<IMetadata>("Metadata", MetadataSchema);

export { IMetadata, MetadataModel };
