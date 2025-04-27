// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "./Counters.sol";

contract NFTMarket is ERC721, ERC2981 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => string) private _tokenURIs;

    event NFTListed(uint256 tokenId, uint256 price, address seller);
    event NFTSold(uint256 tokenId, address buyer, uint256 price);

    constructor() ERC721("Web3JobNFT", "W3J") {
        _setDefaultRoyalty(msg.sender, 500); // 5% royalties
    }

    function mintAndList(string memory tokenURI, uint256 price) external {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        listToken(tokenId, price);
    }

    function listToken(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        listings[tokenId] = Listing(price, msg.sender);
        emit NFTListed(tokenId, price, msg.sender);
    }

    function buyToken(uint256 tokenId) external payable {
        Listing memory listing = listings[tokenId];
        require(msg.value >= listing.price, "Insufficient funds");

        _transfer(listing.seller, msg.sender, tokenId);
        payable(listing.seller).transfer(msg.value);
        delete listings[tokenId];

        emit NFTSold(tokenId, msg.sender, listing.price);
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        _tokenURIs[tokenId] = tokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}