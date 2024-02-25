// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Utils {
    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
}