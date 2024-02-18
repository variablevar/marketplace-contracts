// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./blueprints/AccessControlBlueprint.sol";

contract AccessControl is AccessControlBlueprint {
    function addAdmin(address account) external virtual override onlyAdmin {
        admins[account] = true;
    }

    function removeAdmin(address account) external virtual override onlyAdmin {
        delete admins[account];
    }

    function addModerator(address account) external virtual override onlyAdmin {
        moderators[account] = true;
    }

    function removeModerator(
        address account
    ) external virtual override onlyAdmin {
        delete moderators[account];
    }
}
