import React, { useEffect, useState, useContext } from "react";
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './AccountContext';
import IPLTicketing from "./iplticket.json"; // Import the IPLTicketing contract JSON
import TicketingNFT from "./TicketingNFT.json"; // Import the TicketingNFT contract JSON
import "./Tickets.css";
import logo1 from "../assets/strlogo.png";



function Tickets() {
  const { selectedAccount } = useContext(AccountContext);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [sortAsc, setSortAsc] = useState(true); // State for sorting
  const navigate = useNavigate();

  const matches = [
    { id: 1, matchName: 'Mumbai Indians\nvs\nChennai Super Kings', venue: 'Wankhede Stadium, Mumbai', price: 1, nftToken: 1 },
    { id: 2, matchName: 'Royal Challengers Bangalore\nvs\nSunrisers Hyderabad', venue: 'M. Chinnaswamy Stadium, Bangalore', price: 5, nftToken: 5 },
    { id: 3, matchName: 'Delhi Capitals\nvs\nKolkata Knight Riders', venue: 'Arun Jaitley Stadium, Delhi', price: 10, nftToken: 10 },
    { id: 4, matchName: 'Punjab Kings\nvs\nRajasthan Royals', venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali', price: 5, nftToken: 5 },
    { id: 5, matchName: 'Chennai Super Kings\nvs\nMumbai Indians', venue: 'MA Chidambaram Stadium, Chennai', price: 15, nftToken: 15 },
    { id: 6, matchName: 'Sunrisers Hyderabad\nvs\nRoyal Challengers Bangalore', venue: 'Rajiv Gandhi International Stadium, Hyderabad', price: 10, nftToken: 10 },
    { id: 7, matchName: 'Kolkata Knight Riders\nvs\nDelhi Capitals', venue: 'Eden Gardens, Kolkata', price: 15, nftToken: 15 },
    { id: 8, matchName: 'Rajasthan Royals\nvs\nPunjab Kings', venue: 'Sawai Mansingh Stadium, Jaipur', price: 15, nftToken: 5 },
    { id: 9, matchName: 'Mumbai Indians\nvs\nRoyal Challengers Bangalore', venue: 'Wankhede Stadium, Mumbai', price: 15, nftToken: 15 },
    { id: 10, matchName: 'Chennai Super Kings\nvs\nSunrisers Hyderabad', venue: 'MA Chidambaram Stadium, Chennai', price: 10, nftToken: 10 },
    { id: 11, matchName: 'Delhi Capitals\nvs\nPunjab Kings', venue: 'Arun Jaitley Stadium, Delhi', price: 5, nftToken: 5 },
    { id: 12, matchName: 'Kolkata Knight Riders\nvs\nRajasthan Royals', venue: 'Eden Gardens, Kolkata', price: 5, nftToken: 5 },
    { id: 13, matchName: 'Royal Challengers Bangalore\nvs\nMumbai Indians', venue: 'M. Chinnaswamy Stadium, Bangalore', price: 20, nftToken: 20 },
    { id: 14, matchName: 'Sunrisers Hyderabad\nvs\nChennai Super Kings', venue: 'Rajiv Gandhi International Stadium, Hyderabad', price: 15, nftToken: 15 },
    { id: 15, matchName: 'Punjab Kings\nvs\nDelhi Capitals', venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali', price: 10, nftToken: 10 },
    { id: 16, matchName: 'Rajasthan Royals\nvs\nKolkata Knight Riders', venue: 'Sawai Mansingh Stadium, Jaipur', price: 5, nftToken: 5 },
    { id: 17, matchName: 'Mumbai Indians\nvs\nDelhi Capitals', venue: 'Wankhede Stadium, Mumbai', price: 10, nftToken: 10 },
    { id: 18, matchName: 'Royal Challengers Bangalore\nvs\nChennai Super Kings', venue: 'M. Chinnaswamy Stadium, Bangalore', price: 25, nftToken: 25 },
    { id: 19, matchName: 'Sunrisers Hyderabad\nvs\nRajasthan Royals', venue: 'Rajiv Gandhi International Stadium, Hyderabad', price: 15, nftToken: 15 },
    { id: 20, matchName: 'Kolkata Knight Riders\nvs\nPunjab Kings', venue: 'Eden Gardens, Kolkata', price: 10, nftToken: 10 }
  ];

  useEffect(() => {
    async function initEthers() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        setSigner(signer);

        try {
          const accounts = await provider.send("eth_requestAccounts", []);
          setAccounts(accounts);
          const network = await provider.getNetwork();
          const networkId = network.chainId;

          // Logging to debug
          console.log("Network ID:", networkId);
          console.log("IPLTicketing Networks:", IPLTicketing.networks);
          console.log("TicketingNFT Networks:", TicketingNFT.networks);

          const deployedNetwork = IPLTicketing.networks[networkId];
          const deployedNftNetwork = TicketingNFT.networks[networkId];

          // More logging
          console.log("Deployed Network:", deployedNetwork);
          console.log("Deployed NFT Network:", deployedNftNetwork);

          if (deployedNetwork && deployedNftNetwork) {
            const contractInstance = new ethers.Contract(
              deployedNetwork.address,
              IPLTicketing.abi,
              signer
            );
            const nftContractInstance = new ethers.Contract(
              deployedNftNetwork.address,
              TicketingNFT.abi,
              signer
            );
            setContract(contractInstance);
            setNftContract(nftContractInstance);
            console.log("Contract loaded:", contractInstance);
            console.log("NFT Contract loaded:", nftContractInstance);
          } else {
            console.error("Contract not deployed on this network");
          }
        } catch (error) {
          console.error("Error initializing ethers", error);
        }
      } else {
        console.error("Ethereum browser extension not detected");
      }
    }
    initEthers();
  }, []);

  const transferETH = async (receiverAddress, amount) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
      const senderPrivateKey = "0xc18f65aa0d16c86413c15c4ec88f6fff1d98ae63da1046d47b4d49a83cc85d0e";
      const senderWallet = new ethers.Wallet(senderPrivateKey, provider);
      const tx = {
        to: receiverAddress,
        value: ethers.utils.parseEther(amount.toString()) // Convert amount to ETH
      };
      const transactionResponse = await senderWallet.sendTransaction(tx);
      console.log("Transaction Hash:", transactionResponse.hash);
      const receipt = await transactionResponse.wait();
      console.log("Transaction was mined in block:", receipt.blockNumber);
      return receipt;
    } catch (error) {
      console.error("Error transferring ETH", error);
      throw error;
    }
  };

  const buyTicket = async (matchId, price,matchName) => {
    if (!contract || !nftContract) {
      console.error("Contract is not loaded");
      return;
    }

    try {
      const value = ethers.utils.parseEther(price.toString());
      console.log("Price in ETH:", value.toString());

      const receipt = await transferETH("0x6376e9AfcE9aBaF9782a9d2C34b384813B0AA52f", ethers.utils.formatEther(value));

      if (receipt) {
        // Call the buyTicket function of the contract
        const transaction = await contract.buyTicket(matchId, { value });
        const receipt = await transaction.wait();

        receipt.events.forEach((event) => {
          if (event.event === "TicketPurchased") {
            console.log("Ticket purchased:", event.args);
          }
        });

        console.log("Transaction successful with hash:", receipt.transactionHash);

        // Navigate to confirmation page with ticket details
        navigate('/confirmticket', { state: { matchId,matchName, price, transactionHash: receipt.transactionHash } });
      }
    } catch (error) {
      console.error("Error buying ticket", error);
      if (error.code === "ACTION_REJECTED") {
        console.error("Transaction rejected by the user.");
      } else if (error.code === "INSUFFICIENT_FUNDS") {
        console.error("You do not have enough ETH to complete this transaction.");
      } else {
        console.error("Transaction error:", error.message);
      }
    }
  };

  const sortedMatches = [...matches].sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

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



      <section className="sortingsec">
      <div className="sort-container">
          <select className="sort-dropdown" onChange={(e) => setSortAsc(e.target.value === 'asc')}>
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>
      </section>



      <section className="tickets-content">

        {sortedMatches.map(match => (
          <div key={match.id} className="ticket-card">
            <h2>{match.matchName.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}</h2>
            <p>Venue: {match.venue}</p>
            <p>Price: {match.price} IPL Tokens</p>
            <p>NFT Token: {match.nftToken}</p>
            <button className="ticket-button" onClick={() => buyTicket(match.id, match.price)}>Buy Ticket</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Tickets;
