// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract WalletBlueprint is Ownable {
    function connectWallet() external virtual;
    function viewNFTs() external view virtual;
    function trackTransactions() external view virtual;
}
