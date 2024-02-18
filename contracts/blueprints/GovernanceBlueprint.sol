// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract GovernanceBlueprint is Ownable {
    mapping(address => uint256) public votes;
    mapping(uint256 => bool) public proposalStatus;

    function createProposal(uint256 proposalId) external virtual;
    function vote(uint256 proposalId) external virtual;
    function executeProposal(uint256 proposalId) external virtual;
}
