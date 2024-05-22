import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmTicket() {
  const location = useLocation();
  const { selectedMatch } = location.state;

  return (
    <div>
      <h1>Confirm Ticket</h1>
      <div>
        <h2>Selected Match Details</h2>
        <p>Match Name: {selectedMatch.matchName}</p>
        <p>Venue: {selectedMatch.venue}</p>
        <p>Price: {selectedMatch.price} IPL Tokens</p>
        <p>NFT Token: {selectedMatch.nftToken}</p>
      </div>
      {/* Add more details as needed */}
    </div>
  );
}

export default ConfirmTicket;
