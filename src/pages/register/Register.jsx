
import React from "react";
import "./Register.scss"; // Make sure you define the styles separately

const Register = () => {
  return (
    <div className="register">
      <form>
        {/* Left side: Basic user information */}
        <div className="left">
          <h1>Create a new account</h1>

          <label>Username</label>
          <input type="text" placeholder="johndoe" />

          <label>Email</label>
          <input type="email" placeholder="email@example.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <label>Profile Picture</label>
          <input type="file" />

          <label>Country</label>
          <input type="text" placeholder="USA" />

          <button type="submit">Register</button>
        </div>

        {/* Right side: Seller-specific information */}
        <div className="right">
          <h1>I want to become a seller</h1>

          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <label>Phone Number</label>
          <input type="text" placeholder="+1 234 567 89" />

          <label>Description</label>
          <textarea
            placeholder="A short description of yourself"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
