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
  NFT Factory Deployed at 0xC395Ff63f29F6412EC04AF7B1ed3c44dFACFc325
  NFT Marketplace Deployed at 0x30384Cd73D3eaedefa610307A9908f8Ad8D750af
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
