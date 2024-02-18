// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./blueprints/RoyaltyBlueprint.sol";

contract Royalty is RoyaltyBlueprint {
    mapping(uint256 => uint256) private tokenIdToRoyaltyPercentage;

    function setRoyalty(
        uint256 tokenId,
        uint256 percentage
    ) external override onlyOwner {
        tokenIdToRoyaltyPercentage[tokenId] = percentage;
    }

    function getRoyalty(
        uint256 tokenId
    ) external view override returns (uint256) {
        return tokenIdToRoyaltyPercentage[tokenId];
    }
}
