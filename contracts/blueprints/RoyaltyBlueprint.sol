// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract RoyaltyBlueprint is Ownable {
    function calculateRoyalty(
        uint256 tokenId
    ) external view virtual returns (uint256);
    function distributeRoyalty(
        uint256 tokenId,
        address creator
    ) external payable virtual;
}
