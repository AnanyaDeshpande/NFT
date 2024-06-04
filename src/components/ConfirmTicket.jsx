import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import './ConfirmTicket.css';
import './Navbar.css';

function ConfirmTicket() {
  const location = useLocation();
  const { selectedMatch } = location.state;

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" style={{ fontFamily: "Lucida Handwriting, cursive", fontSize: "24px" }}>IPL Ticket Booking</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/tickets">Tickets</a></li>
        </ul>
      </nav>
      <h1 style={{ fontFamily: "", fontSize: "24px", textAlign:"center" }}>Confirm Ticket</h1>
      <div className='confirm-container'>
        <div className='match-details-card'>
          <h2> Match Details</h2>
          <h3>Match Name: {selectedMatch.matchName}</h3>
          <h3>Venue: {selectedMatch.venue}</h3>
          <h3>Price: {selectedMatch.price} IPL Tokens</h3>
          <h3>NFT Token: {selectedMatch.nftToken}</h3>
        </div><br></br>
        <Link to="/">
          <button className="back-to-home">
            <IoIosHome size={20} style={{ marginRight: '1px' }} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmTicket;
