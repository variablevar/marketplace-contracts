// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract NFTMarketplaceBlueprint is Ownable, ReentrancyGuard {
    uint256 internal platformFee;
    address internal feeRecipient;

    string constant NOT_NFT = "NOT NFT";
    string constant NOT_LISTED = "NOT LISTED";
    string constant ALREADY_LISTED = "ALREADY LISTED";
    string constant NOT_NFT_OWNER = "NOT NFT OWNER";
    string constant NOT_LISTED_OWNER = "NOT LISTED OWNER";
    string constant NFT_ALREADY_SOLD = "NFT ALREADY SOLD";
    string constant INVALID_PRICE = "INVALID PRICE";
    string constant NOT_ZERO_PRICE = "PRICE CANNOT BE 0";
    string constant NOT_OFFERER = "NOT OFFERER";
    string constant OFFER_ALREADY_ACCEPTED = "OFFER ALREADY ACCEPTED";
    string constant INVALID_TIME = "INVALID END TIME";
    string constant NOT_AUCTION_CREATOR = "NOT AUCTION CREATOR";
    string constant AUCTION_ALREADY_CREATED = "AUCTION ALREADY CREATED";
    string constant AUCTION_ALREADY_STARTED = "AUCTION ALREADY STARTED";
    string constant ALREADY_HAVE_BIDDER = "ALREADY HAVE BIDDER";
    string constant AUCTION_NOT_START = "AUCTION NOT START";
    string constant AUCTION_ENDED = "AUCTION ENDED";
    string constant NOT_CREATOR_OWNER_OR_WINNER = "NOT CREATOR , OWNER OR WINNER";
    string constant AUCTION_NOT_ENDED = "AUCTION NOT ENDED";
    string constant CANNOT_MORE_THAT_10 = "CANNOT MORE THAT 10%";
    string constant CANNOT_BE_ADDRESS_0 = "CANNOT BE ADDRESS 0";
    string constant NOT_OFFERERED_NFT = "NOT OFFERERED NFT";
    string constant LESS_THAN_MINIMUM_BID_PRICE = "LESS THAN MINIMUM BID PRICE";

    struct ListNFT {
        address nft;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool sold;
    }

    struct OfferNFT {
        address nft;
        uint256 tokenId;
        address offerer;
        uint256 offerPrice;
        bool accepted;
    }

    struct AuctionNFT {
        address nft;
        uint256 tokenId;
        address creator;
        uint256 initialPrice;
        uint256 minBid;
        uint256 startTime;
        uint256 endTime;
        address lastBidder;
        uint256 heighestBid;
        address winner;
        bool success;
    }

    // nft => tokenId => list struct
    mapping(address => mapping(uint256 => ListNFT)) public listNfts;

    // nft => tokenId => offerer address => offer struct
    mapping(address => mapping(uint256 => mapping(address => OfferNFT)))
        public offerNfts;

    // nft => tokenId => auction struct
    mapping(address => mapping(uint256 => AuctionNFT)) public auctionNfts;

    // auction index => bidding counts => bidder address => bid price
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        public bidPrices;

    // events
    event ListedNFT(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 price,
        address indexed seller
    );
    event BoughtNFT(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 price,
        address seller,
        address indexed buyer
    );
    event OfferredNFT(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 offerPrice,
        address indexed offerer
    );
    event CanceledOfferredNFT(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 offerPrice,
        address indexed offerer
    );
    event AcceptedNFT(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 offerPrice,
        address offerer,
        address indexed nftOwner
    );
    event CreatedAuction(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 price,
        uint256 minBid,
        uint256 startTime,
        uint256 endTime,
        address indexed creator
    );
    event PlacedBid(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 bidPrice,
        address indexed bidder
    );
    event ResultedAuction(
        address indexed nft,
        uint256 indexed tokenId,
        address creator,
        address indexed winner,
        uint256 price,
        address caller
    );

    constructor(
        uint256 _platformFee,
        address _feeRecipient
    )  Ownable(msg.sender){
        require(_platformFee <= 10000, CANNOT_MORE_THAT_10);
        platformFee = _platformFee;
        feeRecipient = _feeRecipient;
    }


    modifier isListedNFT(address _nft, uint256 _tokenId) virtual {
        ListNFT memory listedNFT = listNfts[_nft][_tokenId];
        require(
            listedNFT.seller != address(0) && !listedNFT.sold,
            NOT_LISTED
        );
        _;
    }

    modifier isNotListedNFT(address _nft, uint256 _tokenId) virtual {
        ListNFT memory listedNFT = listNfts[_nft][_tokenId];
        require(
            listedNFT.seller == address(0) || listedNFT.sold,
            ALREADY_LISTED
        );
        _;
    }

    modifier isAuction(address _nft, uint256 _tokenId) virtual  {
        AuctionNFT memory auction = auctionNfts[_nft][_tokenId];
        require(
            auction.nft != address(0) && !auction.success,
            AUCTION_ALREADY_CREATED
        );
        _;
    }

    modifier isNotAuction(address _nft, uint256 _tokenId) virtual {
        AuctionNFT memory auction = auctionNfts[_nft][_tokenId];
        require(
            auction.nft == address(0) || auction.success,
            AUCTION_ALREADY_CREATED
        );
        _;
    }

    modifier  isOfferredNFT(
        address _nft,
        uint256 _tokenId,
        address _offerer
    ) virtual {
        OfferNFT memory offer = offerNfts[_nft][_tokenId][_offerer];
        require(
            offer.offerPrice > 0 && offer.offerer != address(0),
            NOT_OFFERERED_NFT
        );
        _;
    }

}
