// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract MetadataBlueprint is Ownable {
    struct NFTMetadata {
        string name;
        string description;
        string imageURI;
    }

    mapping(uint256 => NFTMetadata) public tokenIdToMetadata;

    function setMetadata(
        uint256 tokenId,
        string memory name,
        string memory description,
        string memory imageURI
    ) external virtual;

    function getMetadata(
        uint256 tokenId
    ) external view virtual returns (NFTMetadata memory);
}
