import { ContractRunner } from "ethers";
import { Marketplace__factory } from "../typechain";


export class MarketplaceContract extends Marketplace__factory {
    constructor() {
        super();
    }
    readonly ADDRESS = '0x5587564f2e88ee14BEEFc4C0912FA93908D4dE3f';

    connect(provider:ContractRunner):Marketplace__factory{
        return super.connect(provider);
    }

}

