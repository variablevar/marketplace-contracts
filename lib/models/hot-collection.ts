import mongoose, { Schema } from "mongoose";
import { IUser } from "./user";

export interface IHotCollection extends Document {
  id: string;
  unique_id: string;
  author: IUser;
  name: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  banner: string;
}

export const HotCollectionSchema: Schema = new Schema({
  id: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  published_at: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  created_at: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  updated_at: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  banner: { type: String, required: true, default: "" },
});

const HotCollectionModel = mongoose.model<IHotCollection>(
  "HotCollection",
  HotCollectionSchema
);
export default HotCollectionModel;
