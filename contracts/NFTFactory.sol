// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./NFT.sol";
// 0xA02711b36b4DBF89d67204D9E9f1C6AD9519cE2e
contract NFTFactory {
    mapping(address => address[]) private nfts;

    mapping(address => bool) private factoryNFT;

    event CreatedNFTCollection(
        address creator,
        address nft,
        string name,
        string symbol
    );

    function createNFTCollection(
        string memory _name,
        string memory _symbol,
        uint256 _royaltyFee,
        address _royaltyRecipient
    ) external {
        NFT nft = new NFT(
            _name,
            _symbol,
            msg.sender,
            _royaltyFee,
            _royaltyRecipient
        );
        nfts[msg.sender].push(address(nft));
        factoryNFT[address(nft)] = true;
        emit CreatedNFTCollection(msg.sender, address(nft), _name, _symbol);
    }

    function getOwnCollections() external view returns (address[] memory) {
        return nfts[msg.sender];
    }

    function isfactoryNFT(address _nft) external view returns (bool) {
        return factoryNFT[_nft];
    }
}