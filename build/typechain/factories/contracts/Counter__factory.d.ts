import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Counter, CounterInterface } from "../../contracts/Counter";
type CounterConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Counter__factory extends ContractFactory {
    constructor(...args: CounterConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Counter & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Counter__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50600080819055506102a1806100276000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806306661abd146100465780632baeceb714610064578063d09de08a1461006e575b600080fd5b61004e610078565b60405161005b919061010d565b60405180910390f35b61006c61007e565b005b6100766100db565b005b60005481565b60008054116100c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100b9906101ab565b60405180910390fd5b6000808154809291906100d4906101fa565b9190505550565b6000808154809291906100ed90610223565b9190505550565b6000819050919050565b610107816100f4565b82525050565b600060208201905061012260008301846100fe565b92915050565b600082825260208201905092915050565b7f436f756e7465723a2063616e6e6f742064656372656d656e742062656c6f772060008201527f7a65726f00000000000000000000000000000000000000000000000000000000602082015250565b6000610195602483610128565b91506101a082610139565b604082019050919050565b600060208201905081810360008301526101c481610188565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610205826100f4565b915060008203610218576102176101cb565b5b600182039050919050565b600061022e826100f4565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036102605761025f6101cb565b5b60018201905091905056fea2646970667358221220168ff5b95b9b7147c540bae3cdbf8cd3ba4341b4673ed02ef2718e34df9f211264736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "count";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decrement";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "increment";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): CounterInterface;
    static connect(address: string, runner?: ContractRunner | null): Counter;
}
export {};
