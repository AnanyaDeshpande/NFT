import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import IPLTicketNFT from './IPLTicketNFT.json'; // Import the contract ABI
import logo1 from '../assets/strlogo.png';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserTickets = async () => {
            try {
                // Connect to the Ethereum network
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545'); // Update with your Ethereum node URL
                const accounts = await web3.eth.getAccounts();
    
                // Load user details from localStorage
                const loggedUser = JSON.parse(localStorage.getItem("user"));
                if (!loggedUser) {
                    throw new Error("User details not found.");
                }
                setUser(loggedUser);
    
                // Retrieve ticket details from localStorage
                const ticketDetails = JSON.parse(localStorage.getItem("ticketDetails"));
                if (ticketDetails) {
                    setTickets([ticketDetails]); // Store ticket details in state
                } else {
                    setTickets([]); // If no tickets found, initialize as an empty array
                }
                setLoading(false);
            } catch (error) {
                console.error("Error loading tickets:", error);
                setLoading(false);
            }
        };
    
        loadUserTickets();
    }, []);
    

    return (
        <div>
            <nav className="navbar">
                <img src={logo1} alt="teamlogo" className="nav-logo-image" />
                <div className="navbar-logo">IPL Ticket Booking</div>
                <ul className="navbar-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/About">About</a></li>
                    <li><a href="/tickets">Tickets</a></li>
                    <li><a href="/contactus">Contact Us</a></li>

                </ul>
            </nav>
            <div className="dashboard">
                <h1>Dashboard</h1>
                <div className="user-details">
                    <h2>User Details</h2>
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Name:</strong> {user?.name}</p>
                </div>
                <div className="tickets">
                    <h2>Purchased Tickets</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        tickets.length > 0 ? (
                            <ul>
                                {tickets.map((ticket, index) => (
                                    <li key={index}>
                                        <p><strong>Match ID:</strong> {ticket.matchId}</p>
                                        <p><strong>Match Name:</strong> {ticket.matchName}</p>
                                        <p><strong>Price:</strong> {ticket.price} IPL Tokens</p>
                                        <p><strong>Transaction Hash:</strong> {ticket.transactionHash}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tickets purchased yet.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;