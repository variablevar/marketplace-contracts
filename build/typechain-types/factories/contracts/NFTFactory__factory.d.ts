import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { NFTFactory, NFTFactoryInterface } from "../../contracts/NFTFactory";
type NFTFactoryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class NFTFactory__factory extends ContractFactory {
    constructor(...args: NFTFactoryConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<NFTFactory & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): NFTFactory__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50611e8c806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620000465760003560e01c80631e86a503146200004b5780637a3c7a2c146200008f578063cdbe0fc314620000a8575b600080fd5b6200007a6200005c36600462000232565b6001600160a01b031660009081526001602052604090205460ff1690565b60405190151581526020015b60405180910390f35b620000a6620000a036600462000302565b620000c1565b005b620000b26200019c565b60405162000086919062000389565b60008484338585604051620000d69062000207565b620000e695949392919062000420565b604051809103906000f08015801562000103573d6000803e3d6000fd5b50336000818152602081815260408083208054600180820183559185528385200180546001600160a01b0319166001600160a01b03881690811790915584529182905291829020805460ff19169091179055519192507f63769cea406878ef0dbb67fc60c62a7c20747798c2703734c451fa2e8381ef24916200018d919084908990899062000474565b60405180910390a15050505050565b3360009081526020818152604091829020805483518184028101840190945280845260609392830182828015620001fd57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311620001de575b5050505050905090565b61199580620004c283390190565b80356001600160a01b03811681146200022d57600080fd5b919050565b6000602082840312156200024557600080fd5b620002508262000215565b9392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200027f57600080fd5b813567ffffffffffffffff808211156200029d576200029d62000257565b604051601f8301601f19908116603f01168101908282118183101715620002c857620002c862000257565b81604052838152866020858801011115620002e257600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080608085870312156200031957600080fd5b843567ffffffffffffffff808211156200033257600080fd5b62000340888389016200026d565b955060208701359150808211156200035757600080fd5b5062000366878288016200026d565b935050604085013591506200037e6060860162000215565b905092959194509250565b6020808252825182820181905260009190848201906040850190845b81811015620003cc5783516001600160a01b031683529284019291840191600101620003a5565b50909695505050505050565b6000815180845260005b818110156200040057602081850181015186830182015201620003e2565b506000602082860101526020601f19601f83011685010191505092915050565b60a0815260006200043560a0830188620003d8565b8281036020840152620004498188620003d8565b6001600160a01b03968716604085015260608401959095525050921660809092019190915292915050565b6001600160a01b03858116825284166020820152608060408201819052600090620004a290830185620003d8565b8281036060840152620004b68185620003d8565b97965050505050505056fe60806040523480156200001157600080fd5b5060405162001995380380620019958339810160408190526200003491620002da565b338585600062000045838262000402565b50600162000054828262000402565b5050506001600160a01b0381166200008757604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b620000928162000131565b50612710821115620000e75760405162461bcd60e51b815260206004820152601a60248201527f63616e2774206d6f7265207468616e2031302070657263656e7400000000000060448201526064016200007e565b6001600160a01b038116620000fb57600080fd5b6009829055600a80546001600160a01b0319166001600160a01b038316179055620001268362000183565b5050505050620004ce565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6200018d620001c7565b6001600160a01b038116620001b957604051631e4fbdf760e01b8152600060048201526024016200007e565b620001c48162000131565b50565b6007546001600160a01b03163314620001f65760405163118cdaa760e01b81523360048201526024016200007e565b565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200022057600080fd5b81516001600160401b03808211156200023d576200023d620001f8565b604051601f8301601f19908116603f01168101908282118183101715620002685762000268620001f8565b816040528381526020925086838588010111156200028557600080fd5b600091505b83821015620002a957858201830151818301840152908201906200028a565b600093810190920192909252949350505050565b80516001600160a01b0381168114620002d557600080fd5b919050565b600080600080600060a08688031215620002f357600080fd5b85516001600160401b03808211156200030b57600080fd5b6200031989838a016200020e565b965060208801519150808211156200033057600080fd5b506200033f888289016200020e565b9450506200035060408701620002bd565b9250606086015191506200036760808701620002bd565b90509295509295909350565b600181811c908216806200038857607f821691505b602082108103620003a957634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003fd57600081815260208120601f850160051c81016020861015620003d85750805b601f850160051c820191505b81811015620003f957828155600101620003e4565b5050505b505050565b81516001600160401b038111156200041e576200041e620001f8565b62000436816200042f845462000373565b84620003af565b602080601f8311600181146200046e5760008415620004555750858301515b600019600386901b1c1916600185901b178555620003f9565b600085815260208120601f198616915b828110156200049f578886015182559484019460019091019084016200047e565b5085821015620004be5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6114b780620004de6000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063820bdcdc116100ad578063b88d4fde11610071578063b88d4fde14610268578063c87b56dd1461027b578063d204c45e1461028e578063e985e9c5146102a1578063f2fde38b146102b457600080fd5b8063820bdcdc146102235780638da5cb5b1461022b57806395d89b411461023c57806395edc18c14610244578063a22cb4651461025557600080fd5b806342842e0e116100f457806342842e0e146101c15780634e83be47146101d45780636352211e146101e757806370a08231146101fa578063715018a61461021b57600080fd5b806301ffc9a71461013157806306fdde0314610159578063081812fc1461016e578063095ea7b31461019957806323b872dd146101ae575b600080fd5b61014461013f366004610fa1565b6102c7565b60405190151581526020015b60405180910390f35b6101616102f2565b604051610150919061100e565b61018161017c366004611021565b610384565b6040516001600160a01b039091168152602001610150565b6101ac6101a7366004611056565b6103ad565b005b6101ac6101bc366004611080565b6103bc565b6101ac6101cf366004611080565b61044c565b6101ac6101e2366004611021565b61046c565b6101816101f5366004611021565b6104cb565b61020d6102083660046110bc565b6104d6565b604051908152602001610150565b6101ac61051e565b60095461020d565b6007546001600160a01b0316610181565b610161610532565b600a546001600160a01b0316610181565b6101ac6102633660046110d7565b610541565b6101ac61027636600461119f565b61054c565b610161610289366004611021565b610563565b6101ac61029c36600461121b565b61056e565b6101446102af36600461127d565b6105a5565b6101ac6102c23660046110bc565b6105d3565b60006001600160e01b03198216632483248360e11b14806102ec57506102ec82610611565b92915050565b606060008054610301906112b0565b80601f016020809104026020016040519081016040528092919081815260200182805461032d906112b0565b801561037a5780601f1061034f5761010080835404028352916020019161037a565b820191906000526020600020905b81548152906001019060200180831161035d57829003601f168201915b5050505050905090565b600061038f82610661565b506000828152600460205260409020546001600160a01b03166102ec565b6103b882823361069a565b5050565b6001600160a01b0382166103eb57604051633250574960e11b8152600060048201526024015b60405180910390fd5b60006103f88383336106a7565b9050836001600160a01b0316816001600160a01b031614610446576040516364283d7b60e01b81526001600160a01b03808616600483015260248201849052821660448201526064016103e2565b50505050565b6104678383836040518060200160405280600081525061054c565b505050565b6104746107a0565b6127108111156104c65760405162461bcd60e51b815260206004820152601a60248201527f63616e2774206d6f7265207468616e2031302070657263656e7400000000000060448201526064016103e2565b600955565b60006102ec82610661565b60006001600160a01b038216610502576040516322718ad960e21b8152600060048201526024016103e2565b506001600160a01b031660009081526003602052604090205490565b6105266107a0565b61053060006107cd565b565b606060018054610301906112b0565b6103b833838361081f565b6105578484846103bc565b610446848484846108be565b60606102ec826109e7565b6105766107a0565b600061058160085490565b9050610591600880546001019055565b61059b8382610af8565b6104678183610b12565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6105db6107a0565b6001600160a01b03811661060557604051631e4fbdf760e01b8152600060048201526024016103e2565b61060e816107cd565b50565b60006001600160e01b031982166380ac58cd60e01b148061064257506001600160e01b03198216635b5e139f60e01b145b806102ec57506301ffc9a760e01b6001600160e01b03198316146102ec565b6000818152600260205260408120546001600160a01b0316806102ec57604051637e27328960e01b8152600481018490526024016103e2565b6104678383836001610b62565b6000828152600260205260408120546001600160a01b03908116908316156106d4576106d4818486610c68565b6001600160a01b03811615610712576106f1600085600080610b62565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b03851615610741576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6007546001600160a01b031633146105305760405163118cdaa760e01b81523360048201526024016103e2565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b03821661085157604051630b61174360e31b81526001600160a01b03831660048201526024016103e2565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b1561044657604051630a85bd0160e11b81526001600160a01b0384169063150b7a02906109009033908890879087906004016112ea565b6020604051808303816000875af192505050801561093b575060408051601f3d908101601f1916820190925261093891810190611327565b60015b6109a4573d808015610969576040519150601f19603f3d011682016040523d82523d6000602084013e61096e565b606091505b50805160000361099c57604051633250574960e11b81526001600160a01b03851660048201526024016103e2565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b146109e057604051633250574960e11b81526001600160a01b03851660048201526024016103e2565b5050505050565b60606109f282610661565b5060008281526006602052604081208054610a0c906112b0565b80601f0160208091040260200160405190810160405280929190818152602001828054610a38906112b0565b8015610a855780601f10610a5a57610100808354040283529160200191610a85565b820191906000526020600020905b815481529060010190602001808311610a6857829003601f168201915b505050505090506000610aa360408051602081019091526000815290565b90508051600003610ab5575092915050565b815115610ae7578082604051602001610acf929190611344565b60405160208183030381529060405292505050919050565b610af084610ccc565b949350505050565b6103b8828260405180602001604052806000815250610d41565b6000828152600660205260409020610b2a82826113c1565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b8080610b7657506001600160a01b03821615155b15610c38576000610b8684610661565b90506001600160a01b03831615801590610bb25750826001600160a01b0316816001600160a01b031614155b8015610bc55750610bc381846105a5565b155b15610bee5760405163a9fbf51f60e01b81526001600160a01b03841660048201526024016103e2565b8115610c365783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b610c73838383610d58565b610467576001600160a01b038316610ca157604051637e27328960e01b8152600481018290526024016103e2565b60405163177e802f60e01b81526001600160a01b0383166004820152602481018290526044016103e2565b6060610cd782610661565b506000610cef60408051602081019091526000815290565b90506000815111610d0f5760405180602001604052806000815250610d3a565b80610d1984610dbb565b604051602001610d2a929190611344565b6040516020818303038152906040525b9392505050565b610d4b8383610e4e565b61046760008484846108be565b60006001600160a01b03831615801590610af05750826001600160a01b0316846001600160a01b03161480610d925750610d9284846105a5565b80610af05750506000908152600460205260409020546001600160a01b03908116911614919050565b60606000610dc883610eb3565b600101905060008167ffffffffffffffff811115610de857610de8611113565b6040519080825280601f01601f191660200182016040528015610e12576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610e1c57509392505050565b6001600160a01b038216610e7857604051633250574960e11b8152600060048201526024016103e2565b6000610e86838360006106a7565b90506001600160a01b03811615610467576040516339e3563760e11b8152600060048201526024016103e2565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610ef25772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610f1e576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610f3c57662386f26fc10000830492506010015b6305f5e1008310610f54576305f5e100830492506008015b6127108310610f6857612710830492506004015b60648310610f7a576064830492506002015b600a83106102ec5760010192915050565b6001600160e01b03198116811461060e57600080fd5b600060208284031215610fb357600080fd5b8135610d3a81610f8b565b60005b83811015610fd9578181015183820152602001610fc1565b50506000910152565b60008151808452610ffa816020860160208601610fbe565b601f01601f19169290920160200192915050565b602081526000610d3a6020830184610fe2565b60006020828403121561103357600080fd5b5035919050565b80356001600160a01b038116811461105157600080fd5b919050565b6000806040838503121561106957600080fd5b6110728361103a565b946020939093013593505050565b60008060006060848603121561109557600080fd5b61109e8461103a565b92506110ac6020850161103a565b9150604084013590509250925092565b6000602082840312156110ce57600080fd5b610d3a8261103a565b600080604083850312156110ea57600080fd5b6110f38361103a565b91506020830135801515811461110857600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561114457611144611113565b604051601f8501601f19908116603f0116810190828211818310171561116c5761116c611113565b8160405280935085815286868601111561118557600080fd5b858560208301376000602087830101525050509392505050565b600080600080608085870312156111b557600080fd5b6111be8561103a565b93506111cc6020860161103a565b925060408501359150606085013567ffffffffffffffff8111156111ef57600080fd5b8501601f8101871361120057600080fd5b61120f87823560208401611129565b91505092959194509250565b6000806040838503121561122e57600080fd5b6112378361103a565b9150602083013567ffffffffffffffff81111561125357600080fd5b8301601f8101851361126457600080fd5b61127385823560208401611129565b9150509250929050565b6000806040838503121561129057600080fd5b6112998361103a565b91506112a76020840161103a565b90509250929050565b600181811c908216806112c457607f821691505b6020821081036112e457634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061131d90830184610fe2565b9695505050505050565b60006020828403121561133957600080fd5b8151610d3a81610f8b565b60008351611356818460208801610fbe565b83519083019061136a818360208801610fbe565b01949350505050565b601f82111561046757600081815260208120601f850160051c8101602086101561139a5750805b601f850160051c820191505b818110156113b9578281556001016113a6565b505050505050565b815167ffffffffffffffff8111156113db576113db611113565b6113ef816113e984546112b0565b84611373565b602080601f831160018114611424576000841561140c5750858301515b600019600386901b1c1916600185901b1785556113b9565b600085815260208120601f198616915b8281101561145357888601518255948401946001909101908401611434565b50858210156114715787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea26469706673582212206eb43079a0b9c7961f18e106137f4992f4da486fe269c93202b844f3132052fc64736f6c63430008140033a2646970667358221220b32c1f86f5156c84d1644b3360d3af316a47e7f09e859477aa06a9c0ce65f94a64736f6c63430008140033";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "creator";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "symbol";
            readonly type: "string";
        }];
        readonly name: "CreatedNFTCollection";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "_name";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "_symbol";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "_royaltyFee";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_royaltyRecipient";
            readonly type: "address";
        }];
        readonly name: "createNFTCollection";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getOwnCollections";
        readonly outputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "";
            readonly type: "address[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_nft";
            readonly type: "address";
        }];
        readonly name: "isfactoryNFT";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): NFTFactoryInterface;
    static connect(address: string, runner?: ContractRunner | null): NFTFactory;
}
export {};
