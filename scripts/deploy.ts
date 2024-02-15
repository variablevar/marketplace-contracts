import { ethers } from "hardhat";

async function main() {
  await deploy('Marketplace')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


async function deploy(name:string) {
  const Contract = await ethers.getContractFactory(name);

  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  console.log(
    `${name} with ETH\ndeployed to ${contract.target}`
  );
  
}
