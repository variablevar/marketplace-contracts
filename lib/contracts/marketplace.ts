import { NFTMarketplace, NFTMarketplace__factory } from "../../typechain-types";
import { MARKETPLACE_ADDRESS } from "../constants/address";

const factory = new NFTMarketplace__factory();
export const NFTMarketplaceContract = factory.attach(
  MARKETPLACE_ADDRESS
) as NFTMarketplace;
