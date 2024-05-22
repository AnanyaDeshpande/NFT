import React from "react";
import "./About.css"; // If you have separate CSS for About page

function About() {
  return (
    <div className="home-container"> {/* Reusing the home-container class */}
      <nav className="navbar">
        <div className="navbar-logo">IPL Ticket Booking</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li> {/* Ensure consistent href */}
          <li><a href="/tickets">Tickets</a></li>
      
        </ul>
      </nav>
      <header className="home-header"> {/* Reusing the home-header class */}
        <div >
          <h1>About</h1>
          <p>What is NFTicket?</p>
<p>NFTicket is a decentralized platform that allows users to buy, resell tickets in the form of NFTs for IPL matches. NFTicket also provides a comprehensive view of all IPL-related activity on a single website. This platform was developed with the IPL in mind, recognizing the immense popularity and scale of this cricket tournament. The issue of ticket reselling is significant, as cricket matches, especially in the IPL, draw a massive global audience. Ticket reselling during previous IPL seasons has been rampant, with resellers profiting unfairly from the high demand for tickets. This practice goes against the laws and regulations of many countries and undermines the accessibility of cricket matches for fans of all socioeconomic backgrounds. IPL tickets are often expensive, and the exploitation by resellers further exacerbates the challenge for middle-class and lower-class fans to attend matches in stadiums. This trend contradicts the inclusive spirit of cricket, which is a sport meant for everyone to enjoy.</p>

<p>Our Mission</p>
<p>Our mission is clear: to ensure that cricket matches, particularly IPL matches, are accessible to all fans, regardless of their financial status. We believe that being rich or poor should not determine a fan's ability to watch their favorite team play. Additionally, we prioritize the safety and security of fans attending IPL matches. Historically, clashes between fans of opposing teams have led to dangerous incidents, posing a real threat to fan safety. NFTicket addresses this issue by providing separate tickets for home and away fans for each IPL match. Furthermore, we enable genuine fans who wish to resell their tickets, not for profit, to do so in a secure manner, ensuring that tickets are resold at the original purchase price.</p>

        </div>
      </header>
      {/* Content section can be added similar to the Home page */}
    </div>
  );
}

export default About;
