import React, { useState, useEffect } from "react";
import userDetails from "./userDetails.json"; // Importing userDetails JSON file

function Dashboard() {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve username of logged-in user from local storage
    const loggedInUsername = localStorage.getItem("loggedInUsername");

    // Find user details of the logged-in user
    const loggedInUser = userDetails.find(user => user.username === loggedInUsername);

    // Set user details of the logged-in user
    setLoggedInUserDetails(loggedInUser);
  }, []);

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {loggedInUserDetails && (
        <div>
          <h2>User Details</h2>
          <p>Name: {loggedInUserDetails.name}</p>
          <p>Age: {loggedInUserDetails.age}</p>
          <p>Gender: {loggedInUserDetails.gender}</p>
          <p>Username: {loggedInUserDetails.username}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
