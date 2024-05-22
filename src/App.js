import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountProvider } from './components/AccountContext';
import Home from './components/Home';
import Tickets from './components/Tickets';
import About from './components/About';
import ConfirmTicket from './components/ConfirmTicket';

function App() {
  return (
    <AccountProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/confirmticket" element={<ConfirmTicket />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </Router>
    </AccountProvider>
  );
}

export default App;
