// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

abstract contract EscrowBlueprint {
    mapping(uint256 => address) public escrow;
    modifier onlyBuyer(uint256 tokenId) {
        require(
            escrow[tokenId] == msg.sender,
            "Escrow: Only the buyer can call this function"
        );
        _;
    }
    function deposit(uint256 tokenId, address seller) external payable virtual;
    function release(uint256 tokenId, address buyer) external virtual;
    function refund(uint256 tokenId, address buyer) external virtual;
}
