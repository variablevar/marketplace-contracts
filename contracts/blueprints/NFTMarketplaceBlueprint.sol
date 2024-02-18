// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract NFTMarketplaceBlueprint is Ownable {
    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    struct Auction {
        address seller;
        uint256 tokenId;
        uint256 startingPrice;
        uint256 startTime;
        uint256 endTime;
        address highestBidder;
        uint256 highestBid;
        bool active;
    }

    mapping(uint256 => Listing) public tokenIdToListing;
    mapping(uint256 => Auction) public tokenIdToAuction;

    function listNFT(uint256 tokenId, uint256 price) external virtual;
    function startAuction(
        uint256 tokenId,
        uint256 startingPrice,
        uint256 duration
    ) external virtual;
    function bid(uint256 tokenId) external payable virtual;
    function endAuction(uint256 tokenId) external virtual;
    function cancelListing(uint256 tokenId) external virtual;
}
