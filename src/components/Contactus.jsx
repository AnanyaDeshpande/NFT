import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import the arrow icons
import "./About.css"; // Import the CSS file for About page
import "./Navbar.css";
import klelogo from "../assets/klelogo.png"
import logo1 from "../assets/strlogo.png";
import p1 from "../assets/p1.jpg";
// https://www.linkedin.com/in/sanjana-kurkuri-458953222/
import p2 from "../assets/p2.jpg";
// https://www.linkedin.com/in/ananya-deshpande-9b7ab0261/
import p3 from "../assets/p3.jpg";
// https://linkedin.com/in/khushi-appannavar
import p4 from "../assets/p4.jpg";
// https://www.linkedin.com/in/risheek-hiremath-366b0126a/
import git from "../assets/git.png";
import link from "../assets/link.png";

function About() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const handleQuestionClick = (id) => {
    setExpandedQuestion((prevState) => (prevState === id ? null : id));
  };

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
          <li><a href="/contactus">Contact Us</a></li>
        </ul>
      </nav>
      <header className="colset">
        <div className="colcard">
          <div className="colcard-left">
            <img
              src={klelogo}
              alt="Logo"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="colcard-right">
            <h1>KLE Technological University</h1>
            <h2>School of Computer Science and Engineering</h2>
            <p>Course: Blockchain and Distributed Ledgers</p>
            <p>Project: Ticket booking of IPL through NFT</p>
          </div>
        </div>
      </header>

      <header>
        <h1>
          <strong>The Team</strong>
        </h1>
        <div className="teamcards">
    <div class="card">
        <img class="card-img-top" src={p1} alt="Card image cap" />
        <div class="card-body">
            <p class="card-text">
                <strong>Sanjana Kurkuri</strong>
            </p>
            <div className="link-images">
                <a href="https://github.com">
                    <img src={git} />
                </a>
                <a href="https://www.linkedin.com/in/sanjana-kurkuri-458953222/">
                    <img src={link} />
                </a>
            </div>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top" src={p3} alt="Card image cap" />
        <div class="card-body">
            <p class="card-text">
                <strong>Ananya Deshpande</strong>
            </p>
            <div className="link-images">
                <a href="https://github.com/AnanyaDeshpande">
                    <img src={git} />
                </a>
                <a href="https://www.linkedin.com/in/ananya-deshpande-9b7ab0261/">
                    <img src={link} />
                </a>
            </div>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top" src={p2} alt="Card image cap" />
        <div class="card-body">
            <p class="card-text">
                <strong>Khushi Appannavas</strong>
            </p>
            <div className="link-images">
                <a href="https://github.com/Khushi-MA">
                    <img src={git} />
                </a>
                <a href="https://linkedin.com/in/khushi-appannavar">
                    <img src={link} />
                </a>
            </div>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top" src={p4} alt="Card image cap" />
        <div class="card-body">
            <p class="card-text">
                <strong>Risheek Hiremath</strong>
            </p>
            <div className="link-images">
                <a href="https://github.com">
                    <img src={git} />
                </a>
                <a href="https://www.linkedin.com/in/risheek-hiremath-366b0126a/">
                    <img src={link} />
                </a>
            </div>
        </div>
    </div>
</div>
      </header>

     
    </div>
  );
}

export default About;