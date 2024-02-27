"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockContract = void 0;
const typechain_1 = require("../typechain");
class LockContract extends typechain_1.Lock__factory {
    constructor() {
        super();
        this.ADDRESS = '0xb7d3d5b72d78f3eA34C234Bc6722F77EfF7818bf';
    }
    connect(provider) {
        return super.connect(provider);
    }
}
exports.LockContract = LockContract;
