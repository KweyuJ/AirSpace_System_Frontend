import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://airspace-system-backend-4.onrender.com/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError("Failed to fetch user profile.");
        }
      } catch (error) {
        setError("An error occurred while fetching user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4, bgcolor: "background.paper", borderRadius: "8px" }}>
      <Typography variant="h4">User Profile</Typography>
      <Typography variant="h6">Name: {userData?.name}</Typography>
      <Typography variant="h6">Email: {userData?.email}</Typography>
      <Typography variant="h6">Role: {userData?.role}</Typography>
      {/* Add other user data fields as needed */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        style={{ marginTop: "1rem" }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default UserProfile;
