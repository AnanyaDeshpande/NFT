import React, { useEffect, useState, useContext } from "react";
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './AccountContext';
import IPLTicketing from "./IPLTicketNFT.json"; // Import the IPLTicketing contract JSON
import "./Tickets.css";
import axios from 'axios'; // Import axios for HTTP requests

function Tickets() {
  const { selectedAccount } = useContext(AccountContext);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const matches = [
    { id: 1, matchName: 'Mumbai Indians vs Chennai Super Kings', venue: 'Wankhede Stadium, Mumbai', price: 1, nftToken: 1 },
    // Add your other match objects here
  ];

  useEffect(() => {
    async function initWeb3() {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
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
        } else {
          console.error("Ethereum browser extension not detected");
          alert("Please install MetaMask browser extension to use this application.");
        }
      } catch (error) {
        console.error("Error initializing web3", error);
      }
    }
    initWeb3();
  }, []);

  const uploadMetadataToIPFS = async (metadata) => {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const apiKey = '66b8105276b7b1701d56';
    const apiSecret = '12742fc7f33a4eca2e24dcf81755ed81c6f3e72255a576f6296b4e0e9329a37a';

    const data = JSON.stringify(metadata);
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: apiKey,
          pinata_secret_api_key: apiSecret,
        },
      });
      return response.data.IpfsHash; // Return the IPFS hash
    } catch (error) {
      console.error("Error uploading metadata to IPFS", error);
      throw error;
    }
  };


  const buyTicket = async (matchId, priceInWei) => {
    if (!contract) {
      console.error("Contract is not loaded");
      return;
    }
    if (accounts.length === 0) {
      console.error("No accounts found");
      return;
    }
  
    const match = matches.find(m => m.id === matchId);
    if (!match) {
      console.error("Match not found");
      return;
    }
  
    const metadata = {
      name: `Ticket for ${match.matchName}`,
      description: `This is an NFT ticket for the match between ${match.matchName} at ${match.venue}.`,
      image: `https://example.com/nft-images/${match.id}.png`, // Replace with actual image URL
      attributes: [
        { trait_type: "Match", value: match.matchName },
        { trait_type: "Venue", value: match.venue },
        { trait_type: "Date", value: "2024-05-25" }, // Example date
        { trait_type: "Seat", value: "Block A, Row 10, Seat 12" } // Example seat
      ]
    };
  
    try {
      const tokenURI = await uploadMetadataToIPFS(metadata);
      console.log("Metadata uploaded to IPFS with URI:", tokenURI);
  
      // Verify if the mintTicket method exists
      if (!contract.methods.mintTicket) {
        console.error("mintTicket method does not exist on the contract");
        return;
      }
  
      await contract.methods.mintTicket(matchId, tokenURI).send({ from: accounts[0], value: priceInWei })
        .on('transactionHash', (hash) => {
          console.log('Transaction Hash:', hash);
          // Trigger MetaMask pop-up for transaction confirmation
          window.ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: accounts[0],
                  to: contract.options.address,
                  value: priceInWei,
                  gas: '50000', // Adjust gas limit if needed
                  data: contract.methods.mintTicket(matchId, tokenURI).encodeABI() // Encode the function call
                },
              ],
            })
            .then((txHash) => {
              console.log('Transaction Hash:', txHash);
            })
            .catch((error) => {
              console.error('Error sending transaction:', error);
            });
        })
        .on('receipt', (receipt) => {
          console.log('Transaction receipt:', receipt);
          navigate('/confirmticket', { state: { match } });
        })
        .on('error', (error) => {
          console.error("Error minting NFT ticket", error);
        });
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
