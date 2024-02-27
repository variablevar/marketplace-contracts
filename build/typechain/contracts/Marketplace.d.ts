import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export declare namespace Marketplace {
    type MarketItemStruct = {
        tokenId: BigNumberish;
        seller: AddressLike;
        owner: AddressLike;
        price: BigNumberish;
        sold: boolean;
    };
    type MarketItemStructOutput = [
        tokenId: bigint,
        seller: string,
        owner: string,
        price: bigint,
        sold: boolean
    ] & {
        tokenId: bigint;
        seller: string;
        owner: string;
        price: bigint;
        sold: boolean;
    };
}
export interface MarketplaceInterface extends Interface {
    getFunction(nameOrSignature: "approve" | "balanceOf" | "fetchItemsListed" | "fetchMarketItem" | "fetchMyNFT" | "getApproved" | "getListingFeePercentage" | "isApprovedForAll" | "listingFeePercentage" | "marketItemMap" | "mint" | "name" | "owner" | "ownerOf" | "reSellItem" | "renounceOwnership" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "sellItem" | "setApprovalForAll" | "setListingFeePercentage" | "supportsInterface" | "symbol" | "tokenURI" | "transferFrom" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Approval" | "ApprovalForAll" | "BatchMetadataUpdate" | "MarketItemInit" | "MetadataUpdate" | "OwnershipTransferred" | "Transfer"): EventFragment;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "fetchItemsListed", values?: undefined): string;
    encodeFunctionData(functionFragment: "fetchMarketItem", values?: undefined): string;
    encodeFunctionData(functionFragment: "fetchMyNFT", values?: undefined): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getListingFeePercentage", values?: undefined): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "listingFeePercentage", values?: undefined): string;
    encodeFunctionData(functionFragment: "marketItemMap", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "mint", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "reSellItem", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "sellItem", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setListingFeePercentage", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fetchItemsListed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fetchMarketItem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fetchMyNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getListingFeePercentage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "listingFeePercentage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "marketItemMap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reSellItem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sellItem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setListingFeePercentage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
export declare namespace ApprovalEvent {
    type InputTuple = [
        owner: AddressLike,
        approved: AddressLike,
        tokenId: BigNumberish
    ];
    type OutputTuple = [owner: string, approved: string, tokenId: bigint];
    interface OutputObject {
        owner: string;
        approved: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ApprovalForAllEvent {
    type InputTuple = [
        owner: AddressLike,
        operator: AddressLike,
        approved: boolean
    ];
    type OutputTuple = [
        owner: string,
        operator: string,
        approved: boolean
    ];
    interface OutputObject {
        owner: string;
        operator: string;
        approved: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace BatchMetadataUpdateEvent {
    type InputTuple = [
        _fromTokenId: BigNumberish,
        _toTokenId: BigNumberish
    ];
    type OutputTuple = [_fromTokenId: bigint, _toTokenId: bigint];
    interface OutputObject {
        _fromTokenId: bigint;
        _toTokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MarketItemInitEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        seller: AddressLike,
        owner: AddressLike,
        price: BigNumberish,
        sold: boolean
    ];
    type OutputTuple = [
        tokenId: bigint,
        seller: string,
        owner: string,
        price: bigint,
        sold: boolean
    ];
    interface OutputObject {
        tokenId: bigint;
        seller: string;
        owner: string;
        price: bigint;
        sold: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MetadataUpdateEvent {
    type InputTuple = [_tokenId: BigNumberish];
    type OutputTuple = [_tokenId: bigint];
    interface OutputObject {
        _tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferEvent {
    type InputTuple = [
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ];
    type OutputTuple = [from: string, to: string, tokenId: bigint];
    interface OutputObject {
        from: string;
        to: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Marketplace extends BaseContract {
    connect(runner?: ContractRunner | null): Marketplace;
    waitForDeployment(): Promise<this>;
    interface: MarketplaceInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    approve: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    fetchItemsListed: TypedContractMethod<[
    ], [
        Marketplace.MarketItemStructOutput[]
    ], "view">;
    fetchMarketItem: TypedContractMethod<[
    ], [
        Marketplace.MarketItemStructOutput[]
    ], "view">;
    fetchMyNFT: TypedContractMethod<[
    ], [
        Marketplace.MarketItemStructOutput[]
    ], "view">;
    getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getListingFeePercentage: TypedContractMethod<[], [bigint], "view">;
    isApprovedForAll: TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    listingFeePercentage: TypedContractMethod<[], [bigint], "view">;
    marketItemMap: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            bigint,
            string,
            string,
            bigint,
            boolean
        ] & {
            tokenId: bigint;
            seller: string;
            owner: string;
            price: bigint;
            sold: boolean;
        }
    ], "view">;
    mint: TypedContractMethod<[
        tokenURI: string,
        price: BigNumberish
    ], [
        bigint
    ], "payable">;
    name: TypedContractMethod<[], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    reSellItem: TypedContractMethod<[
        tokenId: BigNumberish,
        price: BigNumberish
    ], [
        void
    ], "payable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    "safeTransferFrom(address,address,uint256)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    "safeTransferFrom(address,address,uint256,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    sellItem: TypedContractMethod<[tokenId: BigNumberish], [void], "payable">;
    setApprovalForAll: TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    setListingFeePercentage: TypedContractMethod<[
        percentage: BigNumberish
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    symbol: TypedContractMethod<[], [string], "view">;
    tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    transferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "fetchItemsListed"): TypedContractMethod<[], [Marketplace.MarketItemStructOutput[]], "view">;
    getFunction(nameOrSignature: "fetchMarketItem"): TypedContractMethod<[], [Marketplace.MarketItemStructOutput[]], "view">;
    getFunction(nameOrSignature: "fetchMyNFT"): TypedContractMethod<[], [Marketplace.MarketItemStructOutput[]], "view">;
    getFunction(nameOrSignature: "getApproved"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "getListingFeePercentage"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "listingFeePercentage"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "marketItemMap"): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            bigint,
            string,
            string,
            bigint,
            boolean
        ] & {
            tokenId: bigint;
            seller: string;
            owner: string;
            price: bigint;
            sold: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        tokenURI: string,
        price: BigNumberish
    ], [
        bigint
    ], "payable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "reSellItem"): TypedContractMethod<[
        tokenId: BigNumberish,
        price: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFrom(address,address,uint256)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFrom(address,address,uint256,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "sellItem"): TypedContractMethod<[tokenId: BigNumberish], [void], "payable">;
    getFunction(nameOrSignature: "setApprovalForAll"): TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setListingFeePercentage"): TypedContractMethod<[percentage: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "tokenURI"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "ApprovalForAll"): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: "BatchMetadataUpdate"): TypedContractEvent<BatchMetadataUpdateEvent.InputTuple, BatchMetadataUpdateEvent.OutputTuple, BatchMetadataUpdateEvent.OutputObject>;
    getEvent(key: "MarketItemInit"): TypedContractEvent<MarketItemInitEvent.InputTuple, MarketItemInitEvent.OutputTuple, MarketItemInitEvent.OutputObject>;
    getEvent(key: "MetadataUpdate"): TypedContractEvent<MetadataUpdateEvent.InputTuple, MetadataUpdateEvent.OutputTuple, MetadataUpdateEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    filters: {
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "ApprovalForAll(address,address,bool)": TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        "BatchMetadataUpdate(uint256,uint256)": TypedContractEvent<BatchMetadataUpdateEvent.InputTuple, BatchMetadataUpdateEvent.OutputTuple, BatchMetadataUpdateEvent.OutputObject>;
        BatchMetadataUpdate: TypedContractEvent<BatchMetadataUpdateEvent.InputTuple, BatchMetadataUpdateEvent.OutputTuple, BatchMetadataUpdateEvent.OutputObject>;
        "MarketItemInit(uint256,address,address,uint256,bool)": TypedContractEvent<MarketItemInitEvent.InputTuple, MarketItemInitEvent.OutputTuple, MarketItemInitEvent.OutputObject>;
        MarketItemInit: TypedContractEvent<MarketItemInitEvent.InputTuple, MarketItemInitEvent.OutputTuple, MarketItemInitEvent.OutputObject>;
        "MetadataUpdate(uint256)": TypedContractEvent<MetadataUpdateEvent.InputTuple, MetadataUpdateEvent.OutputTuple, MetadataUpdateEvent.OutputObject>;
        MetadataUpdate: TypedContractEvent<MetadataUpdateEvent.InputTuple, MetadataUpdateEvent.OutputTuple, MetadataUpdateEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    };
}
