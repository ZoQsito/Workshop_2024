import { Box } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const { isAdmin, setIsAuthenticated, isAuthenticated, decodedToken } =
    useAuth();

  return (
    <>
      <Box>
        <h1>HomePage</h1>
      </Box>
    </>
  );
}

export default HomePage;
