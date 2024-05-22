import React, { useEffect, useState } from "react";
import "./Home.css";
import bgImage from './bg.jpg';

function Home() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
      return;
    }

    try {
      const newAccounts = await window.ethereum.enable();
      setAccounts(newAccounts);
      if (newAccounts.length > 0) {
        setSelectedAccount(newAccounts[0]);
      }
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
      alert(`Error connecting MetaMask: ${error.message}`);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (newAccounts) => {
        setAccounts(newAccounts);
        if (newAccounts.length > 0) {
          setSelectedAccount(newAccounts[0]);
        } else {
          setSelectedAccount('');
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-logo">IPL Ticket Booking</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/tickets">Tickets</a></li>
        </ul>
      </nav>
      <img src={bgImage} alt="IPL" className="home-image" />

      <header className="home-header">
        <div className="header-content">
          <p>Get access to IPL tickets using IPL tokens. Buy, sell, and manage your tickets seamlessly!</p>
          <button className="home-button" onClick={connectMetaMask} id="connectWalletButton">Connect Wallet</button>
          <div id="accountDetails">
            {accounts.length > 0 ? (
              <div>
                <select id="accountList" value={selectedAccount} onChange={(event) => setSelectedAccount(event.target.value)}>
                  {accounts.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
                <p>Selected Account: {selectedAccount}</p>
              </div>
            ) : (
              <p>No accounts connected</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
