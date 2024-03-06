import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export declare namespace NFTMarketplaceBlueprint {
    type ListNFTStruct = {
        nft: AddressLike;
        tokenId: BigNumberish;
        seller: AddressLike;
        price: BigNumberish;
        sold: boolean;
    };
    type ListNFTStructOutput = [
        nft: string,
        tokenId: bigint,
        seller: string,
        price: bigint,
        sold: boolean
    ] & {
        nft: string;
        tokenId: bigint;
        seller: string;
        price: bigint;
        sold: boolean;
    };
}
export interface NFTMarketplaceInterface extends Interface {
    getFunction(nameOrSignature: "acceptOfferNFT" | "auctionNfts" | "bidPlace" | "bidPrices" | "buyNFT" | "calculatePlatformFee" | "calculateRoyalty" | "cancelAuction" | "cancelListedNFT" | "cancelOfferNFT" | "changeFeeRecipient" | "createAuction" | "getListedNFT" | "listNft" | "listNfts" | "offerNFT" | "offerNfts" | "owner" | "renounceOwnership" | "resultAuction" | "transferOwnership" | "updatePlatformFee"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AcceptedNFT" | "BoughtNFT" | "CanceledOfferredNFT" | "CreatedAuction" | "ListedNFT" | "OfferredNFT" | "OwnershipTransferred" | "PlacedBid" | "ResultedAuction"): EventFragment;
    encodeFunctionData(functionFragment: "acceptOfferNFT", values: [AddressLike, BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "auctionNfts", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "bidPlace", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "bidPrices", values: [AddressLike, BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "buyNFT", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculatePlatformFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateRoyalty", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "cancelAuction", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "cancelListedNFT", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "cancelOfferNFT", values: [AddressLike, BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "changeFeeRecipient", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "createAuction", values: [
        AddressLike,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "getListedNFT", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "listNft", values: [AddressLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "listNfts", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "offerNFT", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "offerNfts", values: [AddressLike, BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "resultAuction", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updatePlatformFee", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "acceptOfferNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "auctionNfts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bidPlace", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bidPrices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculatePlatformFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateRoyalty", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelAuction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelListedNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelOfferNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "changeFeeRecipient", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createAuction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getListedNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "listNft", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "listNfts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "offerNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "offerNfts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resultAuction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updatePlatformFee", data: BytesLike): Result;
}
export declare namespace AcceptedNFTEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        offerPrice: BigNumberish,
        offerer: AddressLike,
        nftOwner: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        offerPrice: bigint,
        offerer: string,
        nftOwner: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        offerPrice: bigint;
        offerer: string;
        nftOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace BoughtNFTEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        price: BigNumberish,
        seller: AddressLike,
        buyer: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        price: bigint,
        seller: string,
        buyer: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        price: bigint;
        seller: string;
        buyer: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace CanceledOfferredNFTEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        offerPrice: BigNumberish,
        offerer: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        offerPrice: bigint,
        offerer: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        offerPrice: bigint;
        offerer: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace CreatedAuctionEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        price: BigNumberish,
        minBid: BigNumberish,
        startTime: BigNumberish,
        endTime: BigNumberish,
        creator: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        price: bigint,
        minBid: bigint,
        startTime: bigint,
        endTime: bigint,
        creator: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        price: bigint;
        minBid: bigint;
        startTime: bigint;
        endTime: bigint;
        creator: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ListedNFTEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        price: BigNumberish,
        seller: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        price: bigint,
        seller: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        price: bigint;
        seller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OfferredNFTEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        offerPrice: BigNumberish,
        offerer: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        offerPrice: bigint,
        offerer: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        offerPrice: bigint;
        offerer: string;
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
export declare namespace PlacedBidEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        bidPrice: BigNumberish,
        bidder: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        bidPrice: bigint,
        bidder: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        bidPrice: bigint;
        bidder: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ResultedAuctionEvent {
    type InputTuple = [
        nft: AddressLike,
        tokenId: BigNumberish,
        creator: AddressLike,
        winner: AddressLike,
        price: BigNumberish,
        caller: AddressLike
    ];
    type OutputTuple = [
        nft: string,
        tokenId: bigint,
        creator: string,
        winner: string,
        price: bigint,
        caller: string
    ];
    interface OutputObject {
        nft: string;
        tokenId: bigint;
        creator: string;
        winner: string;
        price: bigint;
        caller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface NFTMarketplace extends BaseContract {
    connect(runner?: ContractRunner | null): NFTMarketplace;
    waitForDeployment(): Promise<this>;
    interface: NFTMarketplaceInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    acceptOfferNFT: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _offerer: AddressLike
    ], [
        void
    ], "nonpayable">;
    auctionNfts: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            bigint,
            bigint,
            bigint,
            string,
            bigint,
            string,
            boolean
        ] & {
            nft: string;
            tokenId: bigint;
            creator: string;
            initialPrice: bigint;
            minBid: bigint;
            startTime: bigint;
            endTime: bigint;
            lastBidder: string;
            heighestBid: bigint;
            winner: string;
            success: boolean;
        }
    ], "view">;
    bidPlace: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "payable">;
    bidPrices: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish,
        arg2: AddressLike
    ], [
        bigint
    ], "view">;
    buyNFT: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "payable">;
    calculatePlatformFee: TypedContractMethod<[
        _price: BigNumberish
    ], [
        bigint
    ], "view">;
    calculateRoyalty: TypedContractMethod<[
        _royalty: BigNumberish,
        _price: BigNumberish
    ], [
        bigint
    ], "view">;
    cancelAuction: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    cancelListedNFT: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    cancelOfferNFT: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _offerer: AddressLike
    ], [
        void
    ], "nonpayable">;
    changeFeeRecipient: TypedContractMethod<[
        _feeRecipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    createAuction: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _price: BigNumberish,
        _minBid: BigNumberish,
        _startTime: BigNumberish,
        _endTime: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getListedNFT: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        NFTMarketplaceBlueprint.ListNFTStructOutput
    ], "view">;
    listNft: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _price: BigNumberish
    ], [
        void
    ], "nonpayable">;
    listNfts: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            boolean
        ] & {
            nft: string;
            tokenId: bigint;
            seller: string;
            price: bigint;
            sold: boolean;
        }
    ], "view">;
    offerNFT: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "payable">;
    offerNfts: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish,
        arg2: AddressLike
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            boolean
        ] & {
            nft: string;
            tokenId: bigint;
            offerer: string;
            offerPrice: bigint;
            accepted: boolean;
        }
    ], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    resultAuction: TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    updatePlatformFee: TypedContractMethod<[
        _platformFee: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "acceptOfferNFT"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _offerer: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "auctionNfts"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            bigint,
            bigint,
            bigint,
            string,
            bigint,
            string,
            boolean
        ] & {
            nft: string;
            tokenId: bigint;
            creator: string;
            initialPrice: bigint;
            minBid: bigint;
            startTime: bigint;
            endTime: bigint;
            lastBidder: string;
            heighestBid: bigint;
            winner: string;
            success: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "bidPlace"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "bidPrices"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish,
        arg2: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "buyNFT"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "calculatePlatformFee"): TypedContractMethod<[_price: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "calculateRoyalty"): TypedContractMethod<[
        _royalty: BigNumberish,
        _price: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "cancelAuction"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "cancelListedNFT"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "cancelOfferNFT"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _offerer: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "changeFeeRecipient"): TypedContractMethod<[_feeRecipient: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "createAuction"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _price: BigNumberish,
        _minBid: BigNumberish,
        _startTime: BigNumberish,
        _endTime: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getListedNFT"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        NFTMarketplaceBlueprint.ListNFTStructOutput
    ], "view">;
    getFunction(nameOrSignature: "listNft"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish,
        _price: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "listNfts"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            boolean
        ] & {
            nft: string;
            tokenId: bigint;
            seller: string;
            price: bigint;
            sold: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "offerNFT"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "offerNfts"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish,
        arg2: AddressLike
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            boolean
        ] & {
            nft: string;
            tokenId: bigint;
            offerer: string;
            offerPrice: bigint;
            accepted: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "resultAuction"): TypedContractMethod<[
        _nft: AddressLike,
        _tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updatePlatformFee"): TypedContractMethod<[_platformFee: BigNumberish], [void], "nonpayable">;
    getEvent(key: "AcceptedNFT"): TypedContractEvent<AcceptedNFTEvent.InputTuple, AcceptedNFTEvent.OutputTuple, AcceptedNFTEvent.OutputObject>;
    getEvent(key: "BoughtNFT"): TypedContractEvent<BoughtNFTEvent.InputTuple, BoughtNFTEvent.OutputTuple, BoughtNFTEvent.OutputObject>;
    getEvent(key: "CanceledOfferredNFT"): TypedContractEvent<CanceledOfferredNFTEvent.InputTuple, CanceledOfferredNFTEvent.OutputTuple, CanceledOfferredNFTEvent.OutputObject>;
    getEvent(key: "CreatedAuction"): TypedContractEvent<CreatedAuctionEvent.InputTuple, CreatedAuctionEvent.OutputTuple, CreatedAuctionEvent.OutputObject>;
    getEvent(key: "ListedNFT"): TypedContractEvent<ListedNFTEvent.InputTuple, ListedNFTEvent.OutputTuple, ListedNFTEvent.OutputObject>;
    getEvent(key: "OfferredNFT"): TypedContractEvent<OfferredNFTEvent.InputTuple, OfferredNFTEvent.OutputTuple, OfferredNFTEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "PlacedBid"): TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
    getEvent(key: "ResultedAuction"): TypedContractEvent<ResultedAuctionEvent.InputTuple, ResultedAuctionEvent.OutputTuple, ResultedAuctionEvent.OutputObject>;
    filters: {
        "AcceptedNFT(address,uint256,uint256,address,address)": TypedContractEvent<AcceptedNFTEvent.InputTuple, AcceptedNFTEvent.OutputTuple, AcceptedNFTEvent.OutputObject>;
        AcceptedNFT: TypedContractEvent<AcceptedNFTEvent.InputTuple, AcceptedNFTEvent.OutputTuple, AcceptedNFTEvent.OutputObject>;
        "BoughtNFT(address,uint256,uint256,address,address)": TypedContractEvent<BoughtNFTEvent.InputTuple, BoughtNFTEvent.OutputTuple, BoughtNFTEvent.OutputObject>;
        BoughtNFT: TypedContractEvent<BoughtNFTEvent.InputTuple, BoughtNFTEvent.OutputTuple, BoughtNFTEvent.OutputObject>;
        "CanceledOfferredNFT(address,uint256,uint256,address)": TypedContractEvent<CanceledOfferredNFTEvent.InputTuple, CanceledOfferredNFTEvent.OutputTuple, CanceledOfferredNFTEvent.OutputObject>;
        CanceledOfferredNFT: TypedContractEvent<CanceledOfferredNFTEvent.InputTuple, CanceledOfferredNFTEvent.OutputTuple, CanceledOfferredNFTEvent.OutputObject>;
        "CreatedAuction(address,uint256,uint256,uint256,uint256,uint256,address)": TypedContractEvent<CreatedAuctionEvent.InputTuple, CreatedAuctionEvent.OutputTuple, CreatedAuctionEvent.OutputObject>;
        CreatedAuction: TypedContractEvent<CreatedAuctionEvent.InputTuple, CreatedAuctionEvent.OutputTuple, CreatedAuctionEvent.OutputObject>;
        "ListedNFT(address,uint256,uint256,address)": TypedContractEvent<ListedNFTEvent.InputTuple, ListedNFTEvent.OutputTuple, ListedNFTEvent.OutputObject>;
        ListedNFT: TypedContractEvent<ListedNFTEvent.InputTuple, ListedNFTEvent.OutputTuple, ListedNFTEvent.OutputObject>;
        "OfferredNFT(address,uint256,uint256,address)": TypedContractEvent<OfferredNFTEvent.InputTuple, OfferredNFTEvent.OutputTuple, OfferredNFTEvent.OutputObject>;
        OfferredNFT: TypedContractEvent<OfferredNFTEvent.InputTuple, OfferredNFTEvent.OutputTuple, OfferredNFTEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "PlacedBid(address,uint256,uint256,address)": TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
        PlacedBid: TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
        "ResultedAuction(address,uint256,address,address,uint256,address)": TypedContractEvent<ResultedAuctionEvent.InputTuple, ResultedAuctionEvent.OutputTuple, ResultedAuctionEvent.OutputObject>;
        ResultedAuction: TypedContractEvent<ResultedAuctionEvent.InputTuple, ResultedAuctionEvent.OutputTuple, ResultedAuctionEvent.OutputObject>;
    };
}
