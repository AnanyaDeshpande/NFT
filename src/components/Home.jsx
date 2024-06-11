import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdLogout } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai"; // Import the new dashboard icon
import AutoType from "./AutoType";

import "./Home.css";
import "./Navbar.css";
import bgImage from "../assets/bg2.png";
import logo1 from "../assets/strlogo.png";
import pw from "../assets/walletplain.png";
import cw from "../assets/walletcolour.png";
import dash from "../assets/dash.png";
// import logo1 from 'D:/Ace/Practicals/blockchain/june1/NFT/src/assets/strlogo.png';

function Home() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown content
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
      return;
    }

    try {
      const newAccounts = await window.ethereum.enable();
      setAccounts(newAccounts);
      if (newAccounts.length > 0) {
        setSelectedAccount(newAccounts[0]);
      }
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
      alert(`Error connecting MetaMask: ${error.message}`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (newAccounts) => {
        setAccounts(newAccounts);
        if (newAccounts.length > 0) {
          setSelectedAccount(newAccounts[0]);
        } else {
          setSelectedAccount("");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <img src={logo1} alt="teamlogo" className="nav-logo-image" />

        <div className="navbar-logo">IPL Ticket Booking</div>
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/tickets">Tickets</a>
          </li>
        </ul>

        {/* <div className="navbar-login"> */}
        <div
          className="navbar-login"
          style={{
            position: "absolute",
            right: "0",
            padding: "30px",
            flexWrap: "wrap",
          }}
        >
          {isLoggedIn ? (
            <div
              className="dropdown"
              ref={dropdownRef}
              style={{ position: "relative" }}
            >
              <button className="profile-icon" onClick={handleProfileClick}>
                <MdPerson size={24} />
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <button
                    className="connect-wallet-button"
                    onClick={connectMetaMask}
                  >
                    Connect Wallet
                  </button>
                  <a href="#" onClick={() => navigate("/dashboard")}>
                    {/* <AiOutlineDashboard size={24} />  */}
        <img src={dash} alt="dashboard" className="drop-img" />
                    
                    Dashboard
                  </a>
                  <a href="#" onClick={handleLogout}>
                    <MdLogout size={24} /> Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            // <button >Login</button>
            <button onClick={() => navigate("/login")} className="profile-icon">
                <MdPerson size={24} />
              </button>
          )}
        </div>
      </nav>

      <div className="header-content">
        <AutoType />
        <div id="accountDetails">
          {accounts.length > 0 ? (
            <div>
              <select
                id="accountList"
                value={selectedAccount}
                onChange={(event) => setSelectedAccount(event.target.value)}
              >
                {accounts.map((account) => (
                  <option key={account} value={account}>
                    {account}
                  </option>
                ))}
              </select>
              <div className="wallet-status">
                <div className="wallet-img-div">
                  <img src={cw} alt="wallet1" className="wallet-image" />
                </div>

                <p>Selected Account: {selectedAccount}</p>
              </div>
            </div>
          ) : (
            <div className="wallet-status">
              <div className="wallet-img-div">
                <img src={pw} alt="wallet2" className="wallet-image" />
              </div>

              <p style={{ color: "var(--rcbred)" }}>No accounts connected</p>
            </div>
          )}
        </div>
      </div>
      <img src={bgImage} alt="IPL" className="home-image" />
    </div>
  );
}

export default Home;
