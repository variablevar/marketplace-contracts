// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Counter.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ERC721URIStorage , Ownable {
    Counter private _tokenIds;
    Counter private _itemSold;
    
    // Listing fee percentage (default: 2%)
    uint256 public listingFeePercentage = 2; 

    mapping(uint256 => MarketItem) public marketItemMap;
    
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemInit(
        uint256 tokenId,
        address payable seller,
        address payable owner,
        uint256 price,
        bool sold
    );

    constructor () ERC721("MARKETPLACE TOKEN","VAR") Ownable(msg.sender) {

    }

    /* SET LISTING FEE PERCENTAGE */
    function setListingFeePercentage(uint256 percentage)  external onlyOwner {
        listingFeePercentage = percentage;
    }

    /* GET LISTING FEE PERCENTAGE */
    function getListingFeePercentage() public view returns (uint256) {
        return listingFeePercentage;
    }

    /* CREATE ERC721 TOKEN STANDARD FOR USER TO MINT NFT */
    function mint(string memory tokenURI, uint256 price) external payable returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.count();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        marketItem(tokenId, price);
        return tokenId;
    }

    /* CREATE TOKEN ON MARKETPLACE */
    function marketItem(uint256 tokenId , uint256 price) private {
        require(price > 0 , "PRICE MUST BE AT LEAST 1");
        uint256 fee = (price * listingFeePercentage) / 100;
        require(msg.value >= fee, "INSUFFICIENT LISTING FEE");

        marketItemMap[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _itemSold.increment();

        emit MarketItemInit(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
    }
    /* RESELL TOKEN ON MARKETPLACE */
    function reSellItem(uint256 tokenId, uint256 price) public payable {
        require(marketItemMap[tokenId].owner == msg.sender, "ONLY ITEM OWNER CAN PERFORM THIS OPERATION");
        uint256 fee = (price * listingFeePercentage) / 100;
        require(msg.value >= fee, "INSUFFICIENT LISTING FEE");

        MarketItem storage item = marketItemMap[tokenId];
        item.sold = false;
        item.price = price;
        item.seller = payable(msg.sender);
        item.owner = payable(address(this));

        emit MarketItemInit(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
    }

    /* SELL TOKEN ON MARKETPLACE */
    function sellItem(uint256 tokenId) public payable {
        MarketItem storage item = marketItemMap[tokenId];

        require(item.owner == msg.sender, "ONLY ITEM OWNER CAN PERFORM THIS OPERATION");
        require(msg.value == item.price, "PRICE MUST MATCH FOR OPERATION");

        item.sold = true;
        item.owner = payable(address(0));

        _transfer(address(this), msg.sender, tokenId);

        payable(owner()).transfer((msg.value * listingFeePercentage) / 100);
        payable(item.seller).transfer(msg.value - ((msg.value * listingFeePercentage) / 100));
    }


    /* FETCH MARKETPLACE ITEMS */
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 count = _tokenIds.count() - _itemSold.count();
        MarketItem[] memory items = new MarketItem[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= _tokenIds.count(); i++) {
            MarketItem storage item = marketItemMap[i];
            if (item.owner == address(this)) {
                items[index] = item;
                index++;
            }
        }
        return items;
    }

    /* FETCH USER'S OWNED NFTs */
    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= _tokenIds.count(); i++) {
            if (marketItemMap[i].owner == msg.sender) {
                count++;
            } 
        }

        MarketItem[] memory items = new MarketItem[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= _tokenIds.count(); i++) {
            if (marketItemMap[i].owner == msg.sender) {
                items[index] = marketItemMap[i];
                index++;
            } 
        }
        return items;
    }

    /* FETCH ITEMS LISTED BY USER */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= _tokenIds.count(); i++) {
            if (marketItemMap[i].seller == msg.sender) {
                count++;
            } 
        }

        MarketItem[] memory items = new MarketItem[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= _tokenIds.count(); i++) {
            if (marketItemMap[i].seller == msg.sender) {
                items[index] = marketItemMap[i];
                index++;
            } 
        }
        return items;
    }
}
