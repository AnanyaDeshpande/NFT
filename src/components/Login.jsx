import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Retrieve the list of registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username and password match any registered user
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <p>New user? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login;
