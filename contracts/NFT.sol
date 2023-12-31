//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is  ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Exchange NFT", "EXNFT") {}

    function safeMint(string memory uri,address marketPlaceAddress , address creator) public payable returns(uint) {
        require(marketPlaceAddress != address(0), "Enter a valid address");
        require(creator != address(0), "Enter a valid creator address");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(creator, tokenId);
        _setTokenURI(tokenId, uri);
        _approve(marketPlaceAddress, tokenId);
        return tokenId;
    }

}