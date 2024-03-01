import { NFTFactory, NFTFactory__factory } from "../../typechain-types";
import { FACTORY_ADDRESS } from "../constants/address";

const factory = new NFTFactory__factory();
export const NFTFactoryContract = factory.attach(FACTORY_ADDRESS) as NFTFactory;
