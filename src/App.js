// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./components/home/Home";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/admin/login/Login";
import { AuthProvider } from "./context/AuthContext"; // Update with the correct path

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    // Check if the user has a valid token in local storage
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleAuthentication = () => {
    setAuthenticated(true);
  };

  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Login route */}
            <Route
              path={`/${process.env.REACT_APP_PATHCODE}/adminLogin`}
              element={<Login onAuthentication={handleAuthentication} />}
            />

            {/* Protected route with conditional rendering */}
            <Route
              path={`/${process.env.REACT_APP_PATHCODE}/adminDashboard`}
              element={
                authenticated ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to={`/${process.env.REACT_APP_PATHCODE}/adminLogin`} />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
