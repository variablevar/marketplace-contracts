import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface NFTFactoryInterface extends Interface {
    getFunction(nameOrSignature: "createNFTCollection" | "getOwnCollections" | "isfactoryNFT"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "CreatedNFTCollection"): EventFragment;
    encodeFunctionData(functionFragment: "createNFTCollection", values: [string, string, BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "getOwnCollections", values?: undefined): string;
    encodeFunctionData(functionFragment: "isfactoryNFT", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "createNFTCollection", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOwnCollections", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isfactoryNFT", data: BytesLike): Result;
}
export declare namespace CreatedNFTCollectionEvent {
    type InputTuple = [
        creator: AddressLike,
        nft: AddressLike,
        name: string,
        symbol: string
    ];
    type OutputTuple = [
        creator: string,
        nft: string,
        name: string,
        symbol: string
    ];
    interface OutputObject {
        creator: string;
        nft: string;
        name: string;
        symbol: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface NFTFactory extends BaseContract {
    connect(runner?: ContractRunner | null): NFTFactory;
    waitForDeployment(): Promise<this>;
    interface: NFTFactoryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    createNFTCollection: TypedContractMethod<[
        _name: string,
        _symbol: string,
        _royaltyFee: BigNumberish,
        _royaltyRecipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getOwnCollections: TypedContractMethod<[], [string[]], "view">;
    isfactoryNFT: TypedContractMethod<[_nft: AddressLike], [boolean], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "createNFTCollection"): TypedContractMethod<[
        _name: string,
        _symbol: string,
        _royaltyFee: BigNumberish,
        _royaltyRecipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getOwnCollections"): TypedContractMethod<[], [string[]], "view">;
    getFunction(nameOrSignature: "isfactoryNFT"): TypedContractMethod<[_nft: AddressLike], [boolean], "view">;
    getEvent(key: "CreatedNFTCollection"): TypedContractEvent<CreatedNFTCollectionEvent.InputTuple, CreatedNFTCollectionEvent.OutputTuple, CreatedNFTCollectionEvent.OutputObject>;
    filters: {
        "CreatedNFTCollection(address,address,string,string)": TypedContractEvent<CreatedNFTCollectionEvent.InputTuple, CreatedNFTCollectionEvent.OutputTuple, CreatedNFTCollectionEvent.OutputObject>;
        CreatedNFTCollection: TypedContractEvent<CreatedNFTCollectionEvent.InputTuple, CreatedNFTCollectionEvent.OutputTuple, CreatedNFTCollectionEvent.OutputObject>;
    };
}
