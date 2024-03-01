import { NFTMarketplace, NFTMarketplace__factory } from "../../typechain-types";
import { FACTORY_ADDRESS } from "../constants/address";

const factory = new NFTMarketplace__factory();
export const NFTMarketplaceContract = factory.attach(
  FACTORY_ADDRESS
) as NFTMarketplace;
