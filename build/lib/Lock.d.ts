import { ContractRunner } from "ethers";
import { Lock__factory } from "../typechain";
export declare class LockContract extends Lock__factory {
    constructor();
    readonly ADDRESS = "0xb7d3d5b72d78f3eA34C234Bc6722F77EfF7818bf";
    connect(provider: ContractRunner): Lock__factory;
}
