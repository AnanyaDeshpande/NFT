import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ConfirmTicket.css";

function ConfirmTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { matchId, price, transactionHash } = location.state || {};

  if (!matchId) {
    navigate('/tickets'); // Redirect back to tickets if no match data is found
    return null;
  }

  return (
    <div className="confirmation-container">
      <h1>Ticket Confirmation</h1>
      <p>Match ID: {matchId}</p>
      <p>Price: {price} IPL Tokens</p>
      <p>Transaction Hash: {transactionHash}</p>
      <button onClick={() => navigate('/tickets')}>Back to Tickets</button>
    </div>
  );
}

export default ConfirmTicket;
