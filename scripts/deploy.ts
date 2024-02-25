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
  NFT DEPLOYMENT 0x828C4EE9C418870E2Fa87e7666E0dbe847CB5C39
  NFT Factory Deployed at 0x701c575106928739AFa9d59f2138f15FA12C9494
  NFT Marketplace Deployed at 0x217C80b6fAEB914DE6d9170350F17b054b2dFBe6
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
