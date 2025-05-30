// login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false); // New state for seller login
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake login demo
    // Now, isSeller will be determined by the checkbox
    localStorage.setItem("currentUser", JSON.stringify({ username, isSeller }));
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Abin Gahatraj"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Strawberryrose"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* New checkbox for "Login as Seller" */}
        <div className="login-as-seller-checkbox">
          <input
            type="checkbox"
            id="isSeller"
            checked={isSeller}
            onChange={(e) => setIsSeller(e.target.checked)}
          />
          <label htmlFor="isSeller">Login as a Seller</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;