import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountProvider } from './components/AccountContext';
import Home from './components/Home';
import Tickets from './components/Tickets';
import About from './components/About';
import ConfirmTicket from './components/ConfirmTicket';
import Login from './components/Login';
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import AutoType from './components/AutoType';
import Contactus from './components/Contactus'
function App() {
  return (
    <AccountProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/confirmticket" element={<ConfirmTicket />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/autotype" element={<AutoType/>}/>
          <Route path="/contactus" element={<Contactus/>}/>
    
        </Routes>
      </Router>
    </AccountProvider>
  );
}

export default App;
