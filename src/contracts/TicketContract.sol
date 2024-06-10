// contracts/TicketContract.sol
pragma solidity ^0.8.0;

contract TicketContract {
    struct Ticket {
        string match;
        string date;
        string seat;
    }

    mapping(address => Ticket[]) public tickets;

    function buyTicket(string memory match, string memory date, string memory seat) public {
        tickets[msg.sender].push(Ticket(match, date, seat));
    }

    function getUserTickets(address user) public view returns (Ticket[] memory) {
        return tickets[user];
    }
}
