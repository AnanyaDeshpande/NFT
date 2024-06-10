import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if username and password are provided
    if (!username || !password) {
      alert("Please provide username and password.");
      return;
    }

    // Retrieve user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if user exists and passwords match
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      // Set isLoggedIn to true and navigate to home page
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      // Display error message for invalid credentials
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
