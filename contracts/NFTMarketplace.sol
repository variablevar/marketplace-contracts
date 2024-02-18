// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./blueprints/NFTMarketplaceBlueprint.sol";

contract NFTMarketplaceImpl is NFTMarketplaceBlueprint {
    function listNFT(uint256 tokenId, uint256 price) external override {
        require(
            tokenIdToListing[tokenId].active == false,
            "NFT already listed"
        );
        tokenIdToListing[tokenId] = Listing(msg.sender, tokenId, price, true);
    }

    function startAuction(
        uint256 tokenId,
        uint256 startingPrice,
        uint256 duration
    ) external override {
        require(
            tokenIdToAuction[tokenId].active == false,
            "Auction already started"
        );
        tokenIdToAuction[tokenId] = Auction({
            seller: msg.sender,
            tokenId: tokenId,
            startingPrice: startingPrice,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            highestBidder: address(0),
            highestBid: startingPrice,
            active: true
        });
    }

    function bid(uint256 tokenId) external payable override {
        Auction storage auction = tokenIdToAuction[tokenId];
        require(auction.active == true, "Auction not active");
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(
            msg.value > auction.highestBid,
            "Bid must be higher than current highest bid"
        );

        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
    }

    function endAuction(uint256 tokenId) external override {
        Auction storage auction = tokenIdToAuction[tokenId];
        require(auction.active == true, "Auction not active");
        require(block.timestamp >= auction.endTime, "Auction not ended yet");

        if (auction.highestBidder != address(0)) {
            payable(auction.seller).transfer(auction.highestBid);
        }

        tokenIdToListing[tokenId] = Listing(
            auction.highestBidder,
            tokenId,
            auction.highestBid,
            true
        );
        delete tokenIdToAuction[tokenId];
    }

    function cancelListing(uint256 tokenId) external override {
        Listing memory listing = tokenIdToListing[tokenId];
        require(listing.active == true, "NFT not listed");
        require(
            msg.sender == listing.seller,
            "Only seller can cancel the listing"
        );

        delete tokenIdToListing[tokenId];
    }
}
