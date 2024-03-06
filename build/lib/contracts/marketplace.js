"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMarketplaceContract = void 0;
const typechain_types_1 = require("../../typechain-types");
const address_1 = require("../constants/address");
const factory = new typechain_types_1.NFTMarketplace__factory();
exports.NFTMarketplaceContract = factory.attach(address_1.MARKETPLACE_ADDRESS);
