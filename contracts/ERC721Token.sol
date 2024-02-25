// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./blueprints/ERC721TokenBlueprint.sol";

/**
 * @title ERC721Token
 * @dev Smart Contract For NFT Token
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract ERC721Token is ERC721TokenBlueprint {
    constructor(
        string memory name,
        string memory symbol
    ) ERC721TokenBlueprint(name, symbol) {}

    function mint(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) external override {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function burn(uint256 tokenId) external override {
        _burn(tokenId);
        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function setTokenURI(
        uint256 tokenId,
        string memory tokenURI
    ) internal override {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = tokenURI;
    }

    function getTokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenURIs[tokenId];
    }

}
