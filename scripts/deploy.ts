import { config } from "dotenv";
import { ethers } from "hardhat";

config();

async function main() {
  const signers = await ethers.getSigners();
  const owner = signers[7];
  const factoryAddress = await deploy("NFTFactory");
  const marketplaceAddress = await deploy(
    "NFTMarketplace",
    2000,
    owner.address,
    factoryAddress
  );

  /* 
  NFT Factory Deployed at 0xb204db9F6799e190a4bf7Af130F838ea5Bd98bC8
  NFT Marketplace Deployed at 0x7CA25CB61E4B886412f26Bf1e00A7DF3A3939633
  */
  console.log(`NFT Factory Deployed at ${factoryAddress}`);
  console.log(`NFT Marketplace Deployed at ${marketplaceAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function deploy(name: string, ...args: any[]) {
  const signers = await ethers.getSigners();
  const owner = signers[7];
  const Contract = await ethers.getContractFactory(name, owner);

  const contract = await Contract.deploy(...args);

  await contract.waitForDeployment();

  return contract.target;
}
