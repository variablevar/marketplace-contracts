// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Using ERC721 standard

abstract contract ERC721TokenBlueprint is ERC721URIStorage, Ownable {
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {}

    mapping(uint256 => string) internal _tokenURIs;

    function mint(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) external virtual;

    function burn(uint256 tokenId) external virtual;
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);
        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function setTokenURI(
        uint256 tokenId,
        string memory tokenURI
    ) internal virtual;

    function getTokenURI(
        uint256 tokenId
    ) public view virtual returns (string memory);

    function _isApprovedOrOwner(
        address spender,
        uint256 tokenId
    ) internal view returns (bool) {
        require(
            _exists(tokenId),
            "ERC721: operator query for nonexistent token"
        );

        address owner = ownerOf(tokenId);
        return (owner == spender ||
            isApprovedForAll(owner, spender) ||
            getApproved(tokenId) == spender);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return bytes(_tokenURIs[tokenId]).length != 0;
    }
}
