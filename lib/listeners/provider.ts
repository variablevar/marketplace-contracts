import { ethers } from "hardhat";

export const provider = new ethers.JsonRpcProvider(
  "http://192.168.29.142:7545"
);
