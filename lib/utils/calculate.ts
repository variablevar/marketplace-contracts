import { ObjectId } from "mongoose";
import { BidModel, NftModel } from "../models";

export async function calculateFloorPricePerUser(
  owner: ObjectId
): Promise<number> {
  const aggregationResult = await NftModel.aggregate([
    {
      $match: { owner }, // Filter tokens by author
    },
    {
      $group: {
        _id: null,
        averagePrice: { $avg: "$price" }, // Calculate the average price of all tokens
      },
    },
  ]);
  return aggregationResult[0]?.averagePrice || 0;
}

export async function calculateDailySalesPerUser(
  author: ObjectId
): Promise<number> {
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

  return aggregationResult[0]?.totalValue || 0;
}

export async function calculateWeeklySalesPerUser(
  author: ObjectId
): Promise<number> {
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

  return aggregationResult[0]?.totalValue || 0;
}
