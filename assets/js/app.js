import { Backdrop, CircularProgress, Container } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "../styles/app.css";
import ResponsiveAppBar from "./components/NavBarMUI";
import { AuthContext } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import AuthAPI from "./services/AuthAPI";
import ToggleColorModeProvider from "./services/ToggleColorModeProvider";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const [decodedToken, setDecodedToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    var token = localStorage.getItem("authToken");

    if (token) {
      var decodedToken = jwtDecode(token);
      setDecodedToken(decodedToken);
      if (decodedToken.roles[0] === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    } else {
      setIsAdmin(false);
      setDecodedToken(null);
    }
  }, [isAuthenticated]);

  const adminRoute = (path, element) => {
    return (
      <Route
        path={path}
        element={
          isAdmin ? (
            element
          ) : (
            <Navigate to="/" state={{ from: window.location.pathname }} />
          )
        }
      />
    );
  };

  if (isAuthenticated && !decodedToken) {
    return (
      <Container>
        <Backdrop open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      </Container>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        decodedToken,
        setIsAdmin,
      }}
    >
      <ToggleColorModeProvider>
        <Router basename={process.env.BASE_PATH}>
          <div className="App">
            <ResponsiveAppBar />
            <main
              id="container"
              style={{
                marginLeft: "10%",
                marginRight: "10%",
                marginTop: "75px",
              }}
            >
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                {adminRoute("/users", <UsersPage />)}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ToggleColorModeProvider>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
const root = createRoot(rootElement);
root.render(<App />);
