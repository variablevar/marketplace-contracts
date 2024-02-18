// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./blueprints/EscrowBlueprint.sol";

contract Escrow is EscrowBlueprint {
    function deposit(uint256 tokenId, address buyer) external payable override {
        require(
            escrow[tokenId] == address(0),
            "Escrow: Token already in escrow"
        );
        escrow[tokenId] = buyer;
    }

    function release(
        uint256 tokenId,
        address seller
    ) external override onlyBuyer(tokenId) {
        address payable receiver = payable(seller);
        receiver.transfer(address(this).balance);
        delete escrow[tokenId];
    }

    function refund(
        uint256 tokenId,
        address buyer
    ) external override onlyBuyer(tokenId) {
        address payable receiver = payable(buyer);
        receiver.transfer(address(this).balance);
        delete escrow[tokenId];
    }
}
