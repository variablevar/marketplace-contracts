// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./blueprints/NFTMarketplaceBlueprint.sol";
import "./NFTFactory.sol";
pragma experimental ABIEncoderV2;

contract NFTMarketplace is NFTMarketplaceBlueprint {
    NFTFactory private immutable factory;

    constructor(
        uint256 _platformFee,
        address _feeRecipient,
        NFTFactory _factory
    )  NFTMarketplaceBlueprint(_platformFee,_feeRecipient) {
        factory = _factory;
    }

    modifier isNFT(address _nft) {
        require(factory.isfactoryNFT(_nft), NOT_NFT);
        _;
    }

    // @notice List NFT on Marketplace
    function listNft(
        address _nft,
        uint256 _tokenId,
        uint256 _price
    ) external isNFT(_nft) {
        IERC721 nft = IERC721(_nft);
        require(nft.ownerOf(_tokenId) == msg.sender, NOT_NFT_OWNER);
        nft.transferFrom(msg.sender, address(this), _tokenId);

        listNfts[_nft][_tokenId] = ListNFT({
            nft: _nft,
            tokenId: _tokenId,
            seller: msg.sender,
            price: _price,
            sold: false
        });

        emit ListedNFT(_nft, _tokenId, _price, msg.sender);
    }

    // @notice Cancel listed NFT
    function cancelListedNFT(address _nft, uint256 _tokenId)
        external
        isListedNFT(_nft, _tokenId)
    {
        ListNFT memory listedNFT = listNfts[_nft][_tokenId];
        require(listedNFT.seller == msg.sender,NOT_LISTED_OWNER);
        IERC721(_nft).transferFrom(address(this), msg.sender, _tokenId);
        delete listNfts[_nft][_tokenId];
    }

    // @notice Buy listed NFT
    function buyNFT(
        address _nft,
        uint256 _tokenId
    ) external payable isListedNFT(_nft, _tokenId)  {
        ListNFT storage listedNft = listNfts[_nft][_tokenId];

        require(!listedNft.sold, NFT_ALREADY_SOLD);
        require(msg.value >= listedNft.price, INVALID_PRICE);

        listedNft.sold = true;
        uint256 _price = msg.value;
        uint256 totalPrice = _price;
        NFT nft = NFT(listedNft.nft);
        address royaltyRecipient = nft.getRoyaltyRecipient();
        uint256 royaltyFee = nft.getRoyaltyFee();

        if (royaltyFee > 0) {
            uint256 royaltyTotal = calculateRoyalty(royaltyFee, _price);

            // Transfer royalty fee to collection owner
            payable(royaltyRecipient).transfer(royaltyTotal);
            totalPrice -= royaltyTotal;
        }

        // Calculate & Transfer platfrom fee
        uint256 platformFeeTotal = calculatePlatformFee(_price);
        payable(feeRecipient).transfer(platformFeeTotal);

        totalPrice -= platformFeeTotal;
        // Transfer to nft owner
        payable(listedNft.seller).transfer(totalPrice);

        // Transfer NFT to buyer
        IERC721(listedNft.nft).safeTransferFrom(
            address(this),
            msg.sender,
            listedNft.tokenId
        );

        emit BoughtNFT(
            listedNft.nft,
            listedNft.tokenId,
            _price,
            listedNft.seller,
            msg.sender
        );
    }

    // @notice Offer listed NFT
    function offerNFT(
        address _nft,
        uint256 _tokenId
    ) external payable  isListedNFT(_nft, _tokenId) {
        require(msg.value > 0, NOT_ZERO_PRICE);
        uint256 _offerPrice = msg.value;

        ListNFT memory nft = listNfts[_nft][_tokenId];

        offerNfts[_nft][_tokenId][msg.sender] = OfferNFT({
            nft: nft.nft,
            tokenId: nft.tokenId,
            offerer: msg.sender,
            offerPrice: _offerPrice,
            accepted: false
        });

        emit OfferredNFT(
            nft.nft,
            nft.tokenId,
            _offerPrice,
            msg.sender
        );
    }

    // @notice Offerer cancel offerring
    function cancelOfferNFT(address _nft, uint256 _tokenId)
        external
        isOfferredNFT(_nft, _tokenId, msg.sender)
    {
        OfferNFT memory offer = offerNfts[_nft][_tokenId][msg.sender];
        require(offer.offerer == msg.sender, NOT_OFFERER);
        require(!offer.accepted, OFFER_ALREADY_ACCEPTED);
        delete offerNfts[_nft][_tokenId][msg.sender];
        payable(offer.offerer).transfer(offer.offerPrice);
        emit CanceledOfferredNFT(
            offer.nft,
            offer.tokenId,
            offer.offerPrice,
            msg.sender
        );
    }

    // @notice listed NFT owner accept offerring
    function acceptOfferNFT(
        address _nft,
        uint256 _tokenId,
        address _offerer
    )
        external
        isOfferredNFT(_nft, _tokenId, _offerer)
        isListedNFT(_nft, _tokenId)
    {
        require(
            listNfts[_nft][_tokenId].seller == msg.sender,
            NOT_LISTED_OWNER
        );
        OfferNFT storage offer = offerNfts[_nft][_tokenId][_offerer];
        ListNFT storage list = listNfts[offer.nft][offer.tokenId];
        require(!list.sold,NFT_ALREADY_SOLD );
        require(!offer.accepted, OFFER_ALREADY_ACCEPTED);

        list.sold = true;
        offer.accepted = true;

        uint256 offerPrice = offer.offerPrice;
        uint256 totalPrice = offerPrice;

        NFT nft = NFT(offer.nft);
        address royaltyRecipient = nft.getRoyaltyRecipient();
        uint256 royaltyFee = nft.getRoyaltyFee();

        if (royaltyFee > 0) {
            uint256 royaltyTotal = calculateRoyalty(royaltyFee, offerPrice);

            // Transfer royalty fee to collection owner
            payable(royaltyRecipient).transfer(royaltyTotal);
            totalPrice -= royaltyTotal;
        }

        // Calculate & Transfer platfrom fee
        uint256 platformFeeTotal = calculatePlatformFee(offerPrice);
        payable(feeRecipient).transfer(platformFeeTotal);
        totalPrice -= platformFeeTotal;

        // Transfer to seller
        payable(list.seller).transfer(totalPrice);

        // Transfer NFT to offerer
        IERC721(list.nft).safeTransferFrom(
            address(this),
            offer.offerer,
            list.tokenId
        );

        emit AcceptedNFT(
            offer.nft,
            offer.tokenId,
            offer.offerPrice,
            offer.offerer,
            list.seller
        );
    }

    // @notice Create autcion
    function createAuction(
        address _nft,
        uint256 _tokenId,
        uint256 _price,
        uint256 _minBid,
        uint256 _startTime,
        uint256 _endTime
    ) external isNotAuction(_nft, _tokenId) {
        IERC721 nft = IERC721(_nft);
        require(nft.ownerOf(_tokenId) == msg.sender, NOT_NFT_OWNER);
        require(_endTime > _startTime, INVALID_TIME);

        nft.transferFrom(msg.sender, address(this), _tokenId);

        auctionNfts[_nft][_tokenId] = AuctionNFT({
            nft: _nft,
            tokenId: _tokenId,
            creator: msg.sender,
            initialPrice: _price,
            minBid: _minBid,
            startTime: _startTime,
            endTime: _endTime,
            lastBidder: address(0),
            heighestBid: _price,
            winner: address(0),
            success: false
        });

        emit CreatedAuction(
            _nft,
            _tokenId,
            _price,
            _minBid,
            _startTime,
            _endTime,
            msg.sender
        );
    }

    // @notice Cancel auction
    function cancelAuction(address _nft, uint256 _tokenId)
        external
        isAuction(_nft, _tokenId)
    {
        AuctionNFT memory auction = auctionNfts[_nft][_tokenId];
        require(auction.creator == msg.sender, NOT_AUCTION_CREATOR);
        require(block.timestamp < auction.startTime, AUCTION_ALREADY_STARTED);
        require(auction.lastBidder == address(0), ALREADY_HAVE_BIDDER);

        IERC721 nft = IERC721(_nft);
        nft.transferFrom(address(this), msg.sender, _tokenId);
        delete auctionNfts[_nft][_tokenId];
    }

    // @notice Bid place auction
    function bidPlace(
        address _nft,
        uint256 _tokenId
    ) external payable isAuction(_nft, _tokenId) {
        require(
            block.timestamp >= auctionNfts[_nft][_tokenId].startTime,
            AUCTION_NOT_START
        );
        require(
            block.timestamp <= auctionNfts[_nft][_tokenId].endTime,
            AUCTION_ENDED
        );
        require(
            msg.value >=
                auctionNfts[_nft][_tokenId].heighestBid +
                    auctionNfts[_nft][_tokenId].minBid,
            LESS_THAN_MINIMUM_BID_PRICE
        );

        uint256 _bidPrice = msg.value;

        AuctionNFT storage auction = auctionNfts[_nft][_tokenId];
       
        if (auction.lastBidder != address(0)) {
            address lastBidder = auction.lastBidder;
            uint256 lastBidPrice = auction.heighestBid;

            // Transfer back to last bidder
            payable (lastBidder).transfer(lastBidPrice);
        }

        // Set new heighest bid price
        auction.lastBidder = msg.sender;
        auction.heighestBid = _bidPrice;

        emit PlacedBid(_nft, _tokenId, _bidPrice, msg.sender);
    }

    // @notice Result auction, can call by auction creator, heighest bidder, or marketplace owner only!
    function resultAuction(address _nft, uint256 _tokenId) external {
        require(!auctionNfts[_nft][_tokenId].success,AUCTION_ENDED);
        require(
            msg.sender == owner() ||
                msg.sender == auctionNfts[_nft][_tokenId].creator ||
                msg.sender == auctionNfts[_nft][_tokenId].lastBidder,
            NOT_CREATOR_OWNER_OR_WINNER
        );
        require(
            block.timestamp > auctionNfts[_nft][_tokenId].endTime,
            AUCTION_NOT_ENDED
        );

        AuctionNFT storage auction = auctionNfts[_nft][_tokenId];

        IERC721 nft = IERC721(auction.nft);

        auction.success = true;
        auction.winner = auction.creator;

        NFT Nft = NFT(_nft);
        address royaltyRecipient = Nft.getRoyaltyRecipient();
        uint256 royaltyFee = Nft.getRoyaltyFee();

        uint256 heighestBid = auction.heighestBid;
        uint256 totalPrice = heighestBid;

        if (royaltyFee > 0) {
            uint256 royaltyTotal = calculateRoyalty(royaltyFee, heighestBid);

            // Transfer royalty fee to collection owner
            payable (royaltyRecipient).transfer(royaltyTotal);
            totalPrice -= royaltyTotal;
        }

        // Calculate & Transfer platfrom fee
        uint256 platformFeeTotal = calculatePlatformFee(heighestBid);
        payable(feeRecipient).transfer(platformFeeTotal);
        totalPrice -= platformFeeTotal;
        
        // Transfer to auction creator
        payable(auction.creator).transfer(totalPrice);

        // Transfer NFT to the winner
        nft.transferFrom(address(this), auction.lastBidder, auction.tokenId);

        emit ResultedAuction(
            _nft,
            _tokenId,
            auction.creator,
            auction.lastBidder,
            auction.heighestBid,
            msg.sender
        );
    }

    function calculatePlatformFee(uint256 _price)
        public
        view
        returns (uint256)
    {
        return (_price * platformFee) / 10000;
    }

    function calculateRoyalty(uint256 _royalty, uint256 _price)
        public
        pure
        returns (uint256)
    {
        return (_price * _royalty) / 10000;
    }

    function getListedNFT(address _nft, uint256 _tokenId)
        public
        view
        returns (ListNFT memory)
    {
        return listNfts[_nft][_tokenId];
    }

    function updatePlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 10000, CANNOT_MORE_THAT_10);
        platformFee = _platformFee;
    }

    function changeFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), CANNOT_BE_ADDRESS_0);
        feeRecipient = _feeRecipient;
    }
}