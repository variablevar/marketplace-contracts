import { ethers } from "hardhat";

export const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL || "http://3.109.120.65:8545"
);
