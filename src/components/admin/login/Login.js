import React, { useState } from "react";
import axios from "axios";
import { toast} from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onAuthentication }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("/adminLogin", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data; // Get the JWT from the response
        localStorage.setItem("authToken", token); // Store the token
        onAuthentication();
        navigate(`/${process.env.REACT_APP_PATHCODE}/adminDashboard`);
      }
    } catch (error) {
      // console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login </h2>
          <div className="form-group">
            <label>Email:</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-btn login-btn-primary bg-green-300"
            disabled={loading}
          >
            {loading ? (
              <RingLoader color={"#ffffff"} loading={loading} size={24} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
