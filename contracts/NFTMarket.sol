//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./NFT.sol";


contract NFTMarket is AccessControl, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemId;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 public mintingCost = 0.0008 ether;
    bool isPaused;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() {
        owner = payable(msg.sender);
        // Grant the deployer the default admin role which allows for role management
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // Assign the deployer the admin role
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    enum ListingStatus {
        Active,
        Sold,
        Cancelled
    }

    struct _Item {
        ListingStatus status;
        address nftContract;
        address payable owner;
        address payable creator;
        uint256 token;
        uint256 price;
    }

struct UserProfile {
        bytes firstname;
        bytes lastname;
        bytes email;
        bytes password;
    }

    mapping(uint => _Item) public Items;
   mapping(address => UserProfile) private userProfiles;
   address[] private userAddresses; // To keep track of all user addresses
    mapping(address => uint) createdPerWallet;
    mapping(address => uint) ownedPerWallet;

//Emit Events
    event Item (
        address nftContract,
        address owner,
        address creator,
        uint256 token,
        uint256 price
    );

    event CancelSell(
        uint256 token,
        address owner
    );

    event Sold(
        address nftContract,
        address owner,
        address creator,
        uint256 token,
        uint256 price
    );


//Modifiers
    modifier hasCreatedItems {
        require(createdPerWallet[msg.sender] > 0, "You have not yet created any items");
        _;
    }

    modifier hasOwnerItems {
        require(ownedPerWallet[msg.sender] > 0, "You currently own no items");
        _;
    }

    modifier isValidTokenId(uint _tokenId) {
        require(_tokenId >= 0, "Enter a valid tokenId");
        _;
    }

    //     pause all minting and selling actions
    modifier notPaused() {
        require(!isPaused, "Contract is paused");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

   // Function to set user profile with encrypted data
function setUserProfile(
    bytes memory _firstname, 
    bytes memory _lastname, 
    bytes memory _email ,
    bytes memory _password
) public {
    require(_firstname.length > 0, "Firstname cannot be empty");
    require(_lastname.length > 0, "Lastname cannot be empty");
    require(_email.length > 0, "Email cannot be empty");
    require(_password.length > 0, "Password cannot be empty");

    userProfiles[msg.sender] = UserProfile(_firstname, _lastname, _email, _password);
}


    // to get all users' profiles for admin
    function getAllUserProfiles() public view returns (UserProfile[] memory) {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");

        UserProfile[] memory profiles = new UserProfile[](userAddresses.length);
        for(uint i = 0; i < userAddresses.length; i++) {
            profiles[i] = userProfiles[userAddresses[i]];
        }
        return profiles;
    }

    // to get all user addresses for admin
    function getAllUserAddresses() public view returns (address[] memory) {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        return userAddresses;
    }

    //To create an admin user
    function addAdmin(address _admin) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not a default admin");
        grantRole(ADMIN_ROLE, _admin);
    }

    //to revoke an admin user
    function revokeAdmin(address _admin) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not a default admin");
        revokeRole(ADMIN_ROLE, _admin);
    }

    function sellItem(string memory uri,uint256 _price,address _nftContract) public payable notPaused nonReentrant{
        require(_price > 0, "Price must be at least 1 wei");
        require(msg.value == mintingCost, "You need to pay minting price");
        require(_nftContract != address(0), "Enter a valid marketplace address");
        require(bytes(uri).length > 0, "Enter a valid uri");

        uint256 itemId = _itemId.current();
        _itemId.increment();
        createdPerWallet[msg.sender]++;
        uint256 _tokenId = NFT(_nftContract).safeMint(uri,address(this),msg.sender);

        Items[itemId] =  _Item(
            ListingStatus.Active,
            _nftContract,
            payable(address(this)),
            payable(msg.sender),
            _tokenId,
            _price
        );

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        emit Item(
            _nftContract,
            payable(address(this)),
            payable(msg.sender),
            _tokenId,
            _price
        );

    }

    // Fetch all unsold items
    function fetchMarketItems() public view returns (_Item[] memory) {
        uint itemCount = _itemId.current();
        uint unsoldItemCount = _itemId.current() - _itemsSold.current();
        uint currentIndex = 0;

        _Item[] memory items = new _Item[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (Items[i].owner == address(this) && Items[i].status == ListingStatus.Active) {
                _Item storage currentItem = Items[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Fetch creator NFT's
    function fetchCreatorItemsListed() public view hasCreatedItems returns (_Item[] memory) {
        uint totalItemCount = _itemId.current();
        uint itemCount = createdPerWallet[msg.sender];
        _Item[] memory items = new _Item[](itemCount);
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++) {
            if(Items[i].creator == msg.sender){
                _Item storage currentItem = Items[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }


    // Fetch owner NFT's
    function fetchOwnerItemsListed() public view hasOwnerItems  returns (_Item[] memory) {

        uint totalItemCount = _itemId.current();
        uint itemCount = ownedPerWallet[msg.sender];
        uint currentIndex = 0;
        _Item[] memory items = new _Item[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if(Items[i].owner == msg.sender){
                _Item storage currentItem = Items[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function pause() public onlyOwner {
        isPaused = true;
    }

    function unPause() public onlyOwner {
        isPaused = false;
    }

}