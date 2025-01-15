import mongoose from "mongoose";
import { UserModel } from "../../lib/models";
import {
  calculateDailySalesPerUser,
  calculateFloorPricePerUser,
  calculateWeeklySalesPerUser,
} from "../../lib/utils/calculate";

describe("CALCULATION AGGREGATION TEST", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: "marketplace",
    });
  });
  it("IT SHOULD CALCULATE FLOOR PRICE OF NFT WISE OF USER", async () => {
    const users = await UserModel.find();
    for (let index = 0; index < users.length; index++) {
      const user = users[index];

      const floorPrice = await calculateFloorPricePerUser(user._id);
      const dailySales = await calculateDailySalesPerUser(user._id);
      const weeklySales = await calculateWeeklySalesPerUser(user._id);

      console.log({ floorPrice, dailySales, weeklySales });
    }
  });
});
