import fs from "fs";
import { ethers } from "hardhat";
import path from "path";
import { pinFileToIPFS } from "./helper/pinata";
async function accounts() {
  const signers = await ethers.getSigners();
  for (let index = 10; index < signers.length; index++) {
    console.log(signers[index].address);
  }
}

async function resolveAllImages() {
  const files = fs.readdirSync(path.resolve(__dirname, "..", "bundles"));
  for (let index = 0; index < 5; index++) {
    try {
      const filename = files[index];
      const formData = new FormData();
      const file = fs.readFileSync(
        path.resolve(__dirname, "..", "bundles", filename)
      );
      formData.append("file", new Blob([file]));
      const response = await pinFileToIPFS(formData);
      console.log(response.pinataUrl);
    } catch (error) {
      console.log("while file " + index);
    }
  }
  console.log(files[0]);
}

resolveAllImages().then(() => console.log("Done"));
