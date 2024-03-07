import { config } from "dotenv";
import mongoose from "mongoose";
import { listen } from "./listeners";

config();

mongoose.connect(
  process.env.MONGO_URL ||
    "mongodb+srv://master:IzESsNqL7eFrppUf@cluster0.6pg8i.mongodb.net",
  {
    dbName: "marketplace",
  }
);

listen()
  .then(function () {
    console.log("listening started on factory contract");
  })
  .catch(function (err) {
    console.log(err);
  });
