import { compare, hash } from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import { AuthorSaleModel, IAuthorSale } from "./author-sale";
import { IBid } from "./bid";
import { IHotCollection } from "./hot-collection";
import { INft } from "./nft";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  wallet: string;
  social: string;
  followers?: IUser[];
  bid?: IBid;
  author_sale?: IAuthorSale;
  about?: string;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  avatar?: string;
  banner?: string;
  nfts?: INft[];
  hot_collections?: IHotCollection[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  wallet: { type: String, default: "" },
  social: { type: String, required: true, default: "" },
  followers: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  bid: { type: Schema.Types.ObjectId, ref: "Bid" },
  author_sale: { type: Schema.Types.ObjectId, ref: "AuthorSale" },
  about: { type: String, default: "" },
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
  avatar: { type: String, default: "" },
  banner: { type: String, default: "" },
  nfts: { type: [{ type: Schema.Types.ObjectId, ref: "Nft" }], default: [] },
  hot_collections: {
    type: [{ type: Schema.Types.ObjectId, ref: "HotCollection" }],
    default: [],
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew) {
    user.author_sale = await AuthorSaleModel.create({
      address: this.wallet,
      sales: 0,
      volume: 0,
      daily_sales: 0,
      weekly_sales: 0,
      floor_price: 0,
      owners: 0,
      assets: 0,
      author: this,
    });
  }
  if (!user.isModified("password")) return next();

  const hashed = await hash(user.password, 10);
  user.password = hashed;
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return compare(candidatePassword, this.password);
};

// Create and export the mongoose model
export const UserModel = mongoose.model<IUser>("User", UserSchema);
