// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

abstract contract AccessControlBlueprint {
    mapping(address => bool) public admins;
    mapping(address => bool) public moderators;

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin");
        _;
    }

    modifier onlyModerator() {
        require(
            moderators[msg.sender] || admins[msg.sender],
            "Only moderator or admin"
        );
        _;
    }

    function addAdmin(address account) external virtual;
    function removeAdmin(address account) external virtual;
    function addModerator(address account) external virtual;
    function removeModerator(address account) external virtual;
}
