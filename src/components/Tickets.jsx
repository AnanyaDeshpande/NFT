import React, { useEffect, useState, useContext } from "react";
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './AccountContext';
import IPLTicketing from "./iplticket.json"; // Import the IPLTicketing contract JSON
import "./Tickets.css";

function Tickets() {
  const { selectedAccount } = useContext(AccountContext);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const matches = [
    { id: 1, matchName: 'Mumbai Indians vs Chennai Super Kings', venue: 'Wankhede Stadium, Mumbai', price: 1, nftToken: 1 },
    { id: 2, matchName: 'Royal Challengers Bangalore vs Sunrisers Hyderabad', venue: 'M. Chinnaswamy Stadium, Bangalore', price: 140, nftToken: 102 },
    { id: 3, matchName: 'Delhi Capitals vs Kolkata Knight Riders', venue: 'Arun Jaitley Stadium, Delhi', price: 130, nftToken: 103 },
    { id: 4, matchName: 'Punjab Kings vs Rajasthan Royals', venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali', price: 120, nftToken: 104 },
    { id: 5, matchName: 'Chennai Super Kings vs Mumbai Indians', venue: 'MA Chidambaram Stadium, Chennai', price: 160, nftToken: 105 },
    { id: 6, matchName: 'Sunrisers Hyderabad vs Royal Challengers Bangalore', venue: 'Rajiv Gandhi International Stadium, Hyderabad', price: 140, nftToken: 106 },
    { id: 7, matchName: 'Kolkata Knight Riders vs Delhi Capitals', venue: 'Eden Gardens, Kolkata', price: 135, nftToken: 107 },
    { id: 8, matchName: 'Rajasthan Royals vs Punjab Kings', venue: 'Sawai Mansingh Stadium, Jaipur', price: 125, nftToken: 108 },
    { id: 9, matchName: 'Mumbai Indians vs Royal Challengers Bangalore', venue: 'Wankhede Stadium, Mumbai', price: 150, nftToken: 109 },
    { id: 10, matchName: 'Chennai Super Kings vs Sunrisers Hyderabad', venue: 'MA Chidambaram Stadium, Chennai', price: 155, nftToken: 110 },
    { id: 11, matchName: 'Delhi Capitals vs Punjab Kings', venue: 'Arun Jaitley Stadium, Delhi', price: 130, nftToken: 111 },
    { id: 12, matchName: 'Kolkata Knight Riders vs Rajasthan Royals', venue: 'Eden Gardens, Kolkata', price: 140, nftToken: 112 },
    { id: 13, matchName: 'Royal Challengers Bangalore vs Mumbai Indians', venue: 'M. Chinnaswamy Stadium, Bangalore', price: 150, nftToken: 113 },
    { id: 14, matchName: 'Sunrisers Hyderabad vs Chennai Super Kings', venue: 'Rajiv Gandhi International Stadium, Hyderabad', price: 145, nftToken: 114 },
    { id: 15, matchName: 'Punjab Kings vs Delhi Capitals', venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali', price: 125, nftToken: 115 },
    { id: 16, matchName: 'Rajasthan Royals vs Kolkata Knight Riders', venue: 'Sawai Mansingh Stadium, Jaipur', price: 135, nftToken: 116 },
    { id: 17, matchName: 'Mumbai Indians vs Delhi Capitals', venue: 'Wankhede Stadium, Mumbai', price: 150, nftToken: 117 },
    { id: 18, matchName: 'Royal Challengers Bangalore vs Chennai Super Kings', venue: 'M. Chinnaswamy Stadium, Bangalore', price: 155, nftToken: 118 },
    { id: 19, matchName: 'Sunrisers Hyderabad vs Rajasthan Royals', venue: 'Rajiv Gandhi International Stadium, Hyderabad', price: 135, nftToken: 119 },
    { id: 20, matchName: 'Kolkata Knight Riders vs Punjab Kings', venue: 'Eden Gardens, Kolkata', price: 130, nftToken: 120 }
  ];

  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccounts(accounts);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = IPLTicketing.networks[networkId];
          if (deployedNetwork) {
            const contractInstance = new web3Instance.eth.Contract(
              IPLTicketing.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);
            console.log("Contract loaded:", contractInstance);
          } else {
            console.error("Contract not deployed on this network");
          }
        } catch (error) {
          console.error("Error initializing web3", error);
        }
      } else {
        console.error("Ethereum browser extension not detected");
      }
    }
    initWeb3();
  }, []);

  const buyTicket = async (matchId, priceInWei) => {
    if (!contract) {
      console.error("Contract is not loaded");
      return;
    }
    if (accounts.length === 0) {
      console.error("No accounts found");
      return;
    }
    try {
      await contract.methods.buyTicket(matchId).send({ from: accounts[0], value: priceInWei });
      const selectedMatch = matches.find(match => match.id === matchId);
      navigate('/confirmticket', { state: { selectedMatch } });
    } catch (error) {
      console.error("Error buying ticket", error);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-logo">IPL Ticket Booking</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/About">About</a></li>
          <li><a href="/tickets">Tickets</a></li>
        </ul>
      </nav>
      <section className="tickets-content">
        {matches.map(match => (
          <div key={match.id} className="ticket-card">
            <h2>{match.matchName}</h2>
            <p>Venue: {match.venue}</p>
            <p>Price: {match.price} IPL Tokens</p>
            <p>NFT Token: {match.nftToken}</p>
            <button className="ticket-button" onClick={() => buyTicket(match.id, Web3.utils.toWei(match.price.toString(), 'ether'))}>Buy Ticket</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Tickets;
