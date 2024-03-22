import { ObjectId } from "mongoose";
import { BidModel, NftModel } from "../models";
import { IUser } from "../models/user";

export async function calculateFloorPricePerUser(
  owner: IUser
): Promise<any> {
  const aggregationResult = await NftModel.aggregate([
    {
      $match: { owner:'65f4ff92100e1f8f156dc5e5' }, // Filter tokens by author
    },
    {
      $group: {
        _id: null,
        averagePrice: { $avg: "$price" }, // Calculate the average price of all tokens
      },
    },
  ]);
  return aggregationResult;
}

export async function calculateDailySalesPerUser(
  author: IUser
): Promise<any> {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ); // Set time to the start of today

  const aggregationResult = await BidModel.aggregate([
    {
      $match: {
        author,
        created_at: { $gte: startOfDay }, // Filter bids created today (date part only)
      },
    },
    {
      $group: {
        _id: null,
        totalValue: { $sum: "$value" }, // Sum of values for bids created today
      },
    },
  ]);

  return aggregationResult;
}

export async function calculateWeeklySalesPerUser(
  author: IUser
): Promise<any> {
  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  ); // Start of the current week (Sunday)
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 7
  ); // End of the current week (Saturday)

  const aggregationResult = await BidModel.aggregate([
    {
      $match: {
        author,
        created_at: { $gte: startOfWeek, $lt: endOfWeek }, // Filter bids created within the current week
      },
    },
    {
      $group: {
        _id: null,
        totalValue: { $sum: "$value" }, // Sum of values for bids created this week
      },
    },
  ]);

  return aggregationResult;
}
