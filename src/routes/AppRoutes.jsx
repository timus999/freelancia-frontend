// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
// import FreelancerRegister from "../pages/FreelancerRegister";
// import ClientRegister from "../pages/ClientRegister";
import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/signup/freelancer" element={<FreelancerRegister />} /> */}
        {/* <Route path="/signup/client" element={<ClientRegister />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
