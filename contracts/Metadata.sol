// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./blueprints/MetadataBlueprint.sol";

contract Metadata is MetadataBlueprint {
    function setMetadata(
        uint256 tokenId,
        string memory name,
        string memory description,
        string memory imageURI
    ) external override onlyOwner {
        NFTMetadata storage metadata = tokenIdToMetadata[tokenId];
        metadata.name = name;
        metadata.description = description;
        metadata.imageURI = imageURI;
    }

    function getMetadata(
        uint256 tokenId
    ) external view override returns (NFTMetadata memory) {
        NFTMetadata memory metadata = tokenIdToMetadata[tokenId];
        return metadata;
    }
}
