"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTFactoryContract = void 0;
const typechain_types_1 = require("../../typechain-types");
const address_1 = require("../constants/address");
const factory = new typechain_types_1.NFTFactory__factory();
exports.NFTFactoryContract = factory.attach(address_1.FACTORY_ADDRESS);
