// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPLTicketing {
    struct Match {
        string matchName;
        string date;
        string venue;
        uint256 price; // Price in Wei (smallest unit of Ether)
        uint256 nftToken; // Representing NFT token as uint256
        bool exists;
    }

    struct Ticket {
        address buyer;
        uint256 matchId;
        string matchName;
        string date;
        string venue;
        uint256 price;
        uint256 nftToken;
        string bill;
    }

    address public owner;
    uint256 public totalMatches;
    uint256 public carbonContributionRate; // Contribution rate per ticket purchase (e.g., in g CO2)

    mapping(uint256 => Match) public matches;
    mapping(address => Ticket[]) public tickets;

    event MatchCreated(uint256 matchId, string matchName, string date, string venue, uint256 price, uint256 nftToken);
    event TicketPurchased(address indexed buyer, uint256 matchId, string bill);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        carbonContributionRate = 100; // Default rate, can be adjusted
    }

    function createMatch(
        string memory matchName,
        string memory date,
        string memory venue,
        uint256 price,
        uint256 nftToken // Accepting uint256 for NFT token
    ) public onlyOwner {
        totalMatches++;
        matches[totalMatches] = Match(matchName, date, venue, price, nftToken, true);

        emit MatchCreated(totalMatches, matchName, date, venue, price, nftToken);
    }

    function buyTicket(uint256 matchId) public payable {
        Match memory matchDetails = matches[matchId];
        require(matchDetails.exists, "Match does not exist");
        require(msg.value == matchDetails.price, "Incorrect value sent");

        // Generate bill details
        string memory bill = generateBill(matchDetails);

        // Save the ticket purchase
        tickets[msg.sender].push(Ticket(
            msg.sender,
            matchId,
            matchDetails.matchName,
            matchDetails.date,
            matchDetails.venue,
            matchDetails.price,
            matchDetails.nftToken,
            bill
        ));

        emit TicketPurchased(msg.sender, matchId, bill);
    }

    function generateBill(Match memory matchDetails) internal view returns (string memory) {
        uint256 carbonContribution = carbonContributionRate;
        return string(abi.encodePacked(
            "Match: ", matchDetails.matchName, "\n",
            "Date: ", matchDetails.date, "\n",
            "Venue: ", matchDetails.venue, "\n",
            "Price: ", uintToString(matchDetails.price), " Wei\n",
            "NFT Token: ", uintToString(matchDetails.nftToken), "\n", // Convert uint to string
            "Carbon Contribution: ", uintToString(carbonContribution), " g CO2"
        ));
    }

    function uintToString(uint256 v) internal pure returns (string memory) {
        if (v == 0) {
            return "0";
        }
        uint256 j = v;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (v != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(v - v / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            v /= 10;
        }
        return string(bstr);
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
