// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Counter {
    uint256 public count;

    constructor() {
        count = 0; // Initialize the counter to 0
    }

    function increment() public {
        count++; // Increment the counter
    }

    function decrement() public {
        require(count > 0, "Counter: cannot decrement below zero");
        count--; // Decrement the counter if it's greater than 0
    }
}
