// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract NFTMarketplaceBlueprint is Ownable, ReentrancyGuard {
    uint256 internal platformFee;
    address internal feeRecipient;

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

    mapping(address => bool) internal payableToken;
    address[] internal tokens;

    // nft => tokenId => list struct
    mapping(address => mapping(uint256 => ListNFT)) internal listNfts;

    // nft => tokenId => offerer address => offer struct
    mapping(address => mapping(uint256 => mapping(address => OfferNFT)))
        internal offerNfts;

    // nft => tokenId => auction struct
    mapping(address => mapping(uint256 => AuctionNFT)) internal auctionNfts;

    // auction index => bidding counts => bidder address => bid price
    mapping(uint256 => mapping(uint256 => mapping(address => uint256)))
        internal bidPrices;

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
        require(_platformFee <= 10000, "CAN'T MORE THAN 10%");
        platformFee = _platformFee;
        feeRecipient = _feeRecipient;
    }


    modifier isListedNFT(address _nft, uint256 _tokenId) virtual {
        ListNFT memory listedNFT = listNfts[_nft][_tokenId];
        require(
            listedNFT.seller != address(0) && !listedNFT.sold,
            "NOT LISTED"
        );
        _;
    }

    modifier isNotListedNFT(address _nft, uint256 _tokenId) virtual {
        ListNFT memory listedNFT = listNfts[_nft][_tokenId];
        require(
            listedNFT.seller == address(0) || listedNFT.sold,
            "already listed"
        );
        _;
    }

    modifier isAuction(address _nft, uint256 _tokenId) virtual  {
        AuctionNFT memory auction = auctionNfts[_nft][_tokenId];
        require(
            auction.nft != address(0) && !auction.success,
            "auction already created"
        );
        _;
    }

    modifier isNotAuction(address _nft, uint256 _tokenId) virtual {
        AuctionNFT memory auction = auctionNfts[_nft][_tokenId];
        require(
            auction.nft == address(0) || auction.success,
            "auction already created"
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
            "not offerred nft"
        );
        _;
    }

}
