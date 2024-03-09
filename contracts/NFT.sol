// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Counters.sol";

contract NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 private royaltyFee;
    string public imageURI;
    address private royaltyRecipient;

    event Minted(
        address indexed operator,
        string tokenURI,
        uint256 indexed tokenId
    );

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _imageURI,
        address _owner,
        uint256 _royaltyFee,
        address _royaltyRecipient
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        require(_royaltyFee <= 10000, "can't more than 10 percent");
        require(_royaltyRecipient != address(0));
        royaltyFee = _royaltyFee;
        royaltyRecipient = _royaltyRecipient;
        imageURI = _imageURI;
        transferOwnership(_owner);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit Minted(msg.sender, uri, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function getRoyaltyFee() external view returns (uint256) {
        return royaltyFee;
    }

    function getRoyaltyRecipient() external view returns (address) {
        return royaltyRecipient;
    }

    function updateRoyaltyFee(uint256 _royaltyFee) external onlyOwner {
        require(_royaltyFee <= 10000, "can't more than 10 percent");
        royaltyFee = _royaltyFee;
    }
}
