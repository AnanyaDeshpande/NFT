import React, { useEffect, useState } from "react";

function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {userDetails && (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Age: {userDetails.age}</p>
          <p>Gender: {userDetails.gender}</p>
          <p>Username: {userDetails.username}</p>
          {/* Note: You should not display the password in the dashboard */}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
