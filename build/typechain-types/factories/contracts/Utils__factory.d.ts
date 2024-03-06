import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Utils, UtilsInterface } from "../../contracts/Utils";
type UtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Utils__factory extends ContractFactory {
    constructor(...args: UtilsConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Utils & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Utils__factory;
    static readonly bytecode = "0x6080604052348015600f57600080fd5b50607680601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80636c9230db14602d575b600080fd5b4260405190815260200160405180910390f3fea2646970667358221220b49744e5d0fb9ba9d8ea89809c2bf89d95c0c2aa831896878e246a187eaac63a64736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "getCurrentTimestamp";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): UtilsInterface;
    static connect(address: string, runner?: ContractRunner | null): Utils;
}
export {};
