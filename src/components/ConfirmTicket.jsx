import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ConfirmTicket.css";
import logo1 from './strlogo.png';

function ConfirmTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { matchId, matchName,price, transactionHash } = location.state || {};

  if (!matchId) {
    navigate('/tickets'); // Redirect back to tickets if no match data is found
    return null;
  }

  return (
    <div className="home-container">
    <nav className="navbar">
    <img src={logo1} alt="teamlogo" className="nav-logo-image" />

      <div className="navbar-logo">IPL Ticket Booking</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/tickets">Tickets</a></li>
      </ul>
    </nav>
    <div className="confirmation-container">
      <h1>Ticket Confirmation</h1>
      <p><strong>Match ID:</strong> {matchId}</p>
      <p><strong>Price: </strong>{price} IPL Tokens</p>
      <p><strong>Transaction Hash: </strong>{transactionHash}</p>
      {/* <button onClick={() => navigate('/tickets')}>Back to Tickets</button> */}
    </div>
    </div>
  );
}

export default ConfirmTicket;
