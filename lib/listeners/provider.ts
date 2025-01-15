import { ethers } from "hardhat";

export const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
