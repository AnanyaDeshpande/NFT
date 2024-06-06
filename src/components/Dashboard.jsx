import React, { useEffect, useState, useContext } from "react";
import Web3 from 'web3';
import { AccountContext } from './AccountContext';
import IPLTicketing from "./iplticket.json"; // Import the IPLTicketing contract JSON
import "./Dashboard.css";

function Dashboard() {
  const { selectedAccount } = useContext(AccountContext);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [username, setUsername] = useState('');
  const [tickets, setTickets] = useState([]);

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

  useEffect(() => {
    async function fetchUserData() {
      if (contract && selectedAccount) {
        try {
          const username = await contract.methods.getUsername(selectedAccount).call();
          const tickets = await contract.methods.getTicketsByUser(selectedAccount).call();
          setUsername(username);
          setTickets(tickets);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    }
    fetchUserData();
  }, [contract, selectedAccount]);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}</h1>
      <h2>Your Purchased Tickets:</h2>
      <ul className="tickets-list">
        {tickets.map((ticket, index) => (
          <li key={index} className="ticket-item">
            <p>Match: {ticket.matchName}</p>
            <p>Venue: {ticket.venue}</p>
            <p>Price: {ticket.price} IPL Tokens</p>
            <p>NFT Token: {ticket.nftToken}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
