// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract ASMarketPlace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _assetTokenCount;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.01 ether;
    address payable owner;

     // Mapping to store market items
    mapping(uint256 => MarketItem) private tokenIdToMarketItems;

    // Mapping to store user profiles
    mapping(address => UserProfile) private addressToProfile;

    // Market item structure
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // User profile structure
    struct UserProfile{
        string name;
        string email;
    }

    // Event emitted when a user profile is created
    event UserProfileCreated(
        address indexed owner,
        string name,
        string email
    );

    // Event emitted when a market item is created
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // Modifier to restrict function access to contract owner
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner of the marketplace can perform this operation"
        );
        _;
    }

    // Contract constructor
    constructor() ERC721("Metaverse MarketPlace", "MMPC") {
        owner = payable(msg.sender);
    }

    // Function to register a user
    function registerUser(string memory name, string memory email) public {
        addressToProfile[msg.sender] = UserProfile(name, email);
        emit UserProfileCreated(msg.sender, name, email);
    }

    // Function to get a user's registration data
    function getUserRegistrationData(address userAddress) public view returns (string memory, string memory) {
        UserProfile memory userProfile = addressToProfile[userAddress];
        return (userProfile.name, userProfile.email);
    }

    // Function to update the listing price
    function updateListingPrice(uint256 _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    // Function to get the listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Function to get the asset count
    function getTokenCount() public view returns(uint256){
        return _assetTokenCount.current();
    }

    // Function to create a new asset and enlist on market
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        _assetTokenCount.increment();
        uint256 newTokenId = _assetTokenCount.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    // Private function to create a new asset 
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        tokenIdToMarketItems[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 myAssetsCount    = 0;
        uint256 assetCount = _assetTokenCount.current();
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < assetCount; i++) {
            if (tokenIdToMarketItems[i + 1].seller == msg.sender) {
                myAssetsCount += 1;
            }
        }

        MarketItem[] memory assets = new MarketItem[](myAssetsCount);
        for (uint256 i = 0; i < assetCount; i++) {
            if (tokenIdToMarketItems[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = tokenIdToMarketItems[currentId];
                assets[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return assets;
    }

    // Function to resell an asset
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(tokenIdToMarketItems[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        tokenIdToMarketItems[tokenId].sold = false;
        tokenIdToMarketItems[tokenId].price = price;
        tokenIdToMarketItems[tokenId].seller = payable(msg.sender);
        tokenIdToMarketItems[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // Function to create a market sale
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = tokenIdToMarketItems[tokenId].price;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        tokenIdToMarketItems[tokenId].owner = payable(msg.sender);
        tokenIdToMarketItems[tokenId].sold = true;
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(tokenIdToMarketItems[tokenId].seller).transfer(msg.value);
        tokenIdToMarketItems[tokenId].seller = payable(address(0));
    }

    // Returns all unsold assets
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _assetTokenCount.current();
        uint256 unsoldItemCount = _assetTokenCount.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (tokenIdToMarketItems[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = tokenIdToMarketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }


    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _assetTokenCount.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (tokenIdToMarketItems[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (tokenIdToMarketItems[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = tokenIdToMarketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    
}