import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import userDetails from "./userDetails.json";

function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // Check if any field is empty
    if (!name || !age || !gender || !username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if username already exists
    const existingUser = userDetails.find(user => user.username === username);
    if (existingUser) {
      alert("Username already exists. Please choose another one.");
      return;
    }

    // Create new user object
    const newUser = { name, age, gender, username, password };

    // Append new user to existing user details
    userDetails.push(newUser);

    // Update the userDetails.json file
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Notify user and navigate to login page
    alert("Registration successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Register</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
