import mongoose, { Schema } from "mongoose";
import { IUser } from "./user";

export interface IHotCollection extends Document {
  id: number;
  unique_id: string;
  author: IUser;
  name: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  banner: string;
}

export const HotCollectionSchema: Schema = new Schema({
  id: { type: Number, required: true },
  unique_id: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  published_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  banner: { type: String, required: true, default: "" },
});

const HotCollectionModel = mongoose.model<IHotCollection>(
  "HotCollection",
  HotCollectionSchema
);
export default HotCollectionModel;
