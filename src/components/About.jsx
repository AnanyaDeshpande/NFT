import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import the arrow icons
import "./About.css"; // Import the CSS file for About page
import "./Navbar.css";

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

  const questions = [
    {
      id: 1,
      question: "What is NFTicket?",
      answer:
        "NFTicket is a decentralized platform that allows users to buy and resell tickets in the form of NFTs for IPL matches. It aims to provide accessibility to cricket matches, especially IPL matches, to fans of all financial backgrounds.",
    },
    {
      id: 2,
      question: "What is our mission?",
      answer:
        "Our mission is to ensure that cricket matches, particularly IPL matches, are accessible to all fans, regardless of their financial status. We prioritize fan safety and security by providing separate tickets for home and away fans and enabling genuine fans to resell tickets securely.",
    },
    {
      id: 3,
      question: "How does NFT Ticket work?",
      answer:
        "NFT Ticket works by leveraging blockchain technology to create non-fungible tokens (NFTs) representing tickets for IPL matches. Users can purchase these NFT tickets, which are unique digital assets, securely on the platform.",
    },
    {
      id: 4,
      question: "Why are NFTs used for tickets?",
      answer:
        "NFTs are used for tickets because they offer several advantages over traditional paper or digital tickets. NFTs are tamper-proof, verifiable, and cannot be duplicated, making them ideal for representing unique and scarce assets like event tickets.",
    },
    {
      id: 5,
      question: "What are the benefits of using NFT Ticket?",
      answer:
        "The benefits of using NFT Ticket include increased transparency, security, and accessibility for fans. NFT Ticket eliminates the risk of counterfeit tickets and provides a decentralized marketplace for buying, selling, and trading IPL match tickets.",
    },
    // Add more questions and answers here
  ];

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
      <header className="home-header">
        <div>
          <h1>
            <strong>About NFT</strong>
          </h1>
          <div className="faq-container">
            {questions.map(({ id, question, answer }) => (
              // <div key={id} className="faq-item">
              //   <div
              //     className={faq-question ${id === expandedQuestion ? "expanded" : ""}}
              //     onClick={() => handleQuestionClick(id)}
              //   >
              //     {question}
              //     {id === expandedQuestion ? <FaChevronUp className="down-arrow" /> : <FaChevronDown className="down-arrow" />}
              //   </div>
              //   {id === expandedQuestion && <div className="faq-answer">{answer}</div>}
              // </div>
              <div key={id} className="faq-item">
                <div className="faq-question">{question}</div>
                <div className="faq-answer">{answer}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

     
    </div>
  );
}

export default About;