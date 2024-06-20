// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IPLTicketNFT is ERC721, Ownable {

    uint256 public nextTokenId;
    address public admin;

    struct Ticket {
        uint256 matchId;
        string matchName;
        uint256 price;
        string transactionHash;
    }

    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => bool) public tokenExists;

    constructor() ERC721('IPLTicket', 'IPLTKT') Ownable(msg.sender) {
        admin = msg.sender;
    }

    function mint(address to, uint256 _matchId, string memory _matchName, uint256 _price, string memory _transactionHash) external onlyOwner {
        _safeMint(to, nextTokenId);
        
        tickets[nextTokenId] = Ticket({
            matchId: _matchId,
            matchName: _matchName,
            price: _price,
            transactionHash: _transactionHash
        });

        tokenExists[nextTokenId] = true;

        nextTokenId++;
    }

    function getTicketDetails(uint256 tokenId) external view returns (uint256 matchId, string memory matchName, uint256 price, string memory transactionHash) {
        require(tokenExists[tokenId], "Ticket does not exist");
        Ticket storage ticket = tickets[tokenId];
        return (ticket.matchId, ticket.matchName, ticket.price, ticket.transactionHash);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.example.com/metadata/";
    }
}
