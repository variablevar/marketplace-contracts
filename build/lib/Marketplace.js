"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceContract = void 0;
const typechain_1 = require("../typechain");
class MarketplaceContract extends typechain_1.Marketplace__factory {
    constructor() {
        super();
        this.ADDRESS = '0x5587564f2e88ee14BEEFc4C0912FA93908D4dE3f';
    }
    connect(provider) {
        return super.connect(provider);
    }
}
exports.MarketplaceContract = MarketplaceContract;
