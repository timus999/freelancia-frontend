// src/App.jsx
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Orders from "./pages/orders/Orders";
import Mygigs from "./pages/mygigs/Mygigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";

import Login from "./pages/Login";
import Register from "./pages/Register";
import FreelancerRegister from "./pages/FreelancerRegister";
import ClientRegister from "./pages/ClientRegister";


import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './App.scss';
import WCard from "./components/wCard/WCard"; // Keep this import if WCard is used elsewhere, even if not directly in App.jsx

// Import for the Toaster component from react-hot-toast
import toast, { Toaster } from "react-hot-toast";

function App() {
  // The Layout component wraps common elements (Navbar, Footer) around the routed content.
  // The <Outlet /> component from react-router-dom renders the matched child route component.
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet /> {/* This is where the specific page component (e.g., Home, Gigs) will be rendered */}
        <Footer />
      </div>
    );
  };

  // Define the application's routes using createBrowserRouter.
  // This setup allows for nested routes and layouts.
  const router = createBrowserRouter([
    {
      path: "/", // The base path for this route group
      element: <Layout />, // The Layout component will be rendered for all child routes
      children: [
        {
          path: "/", // Home page route
          element: <Home />,
        },
        {
          path: "/gigs", // Gigs listing page
          element: <Gigs />,
        },
        {
          path: "/gig/:id", // Single gig detail page, with a dynamic ID parameter
          element: <Gig />,
        },
        {
          path: "/orders", // Orders page
          element: <Orders />,
        },
        {
          path: "/mygigs", // My Gigs page
          element: <Mygigs />,
        },
        {
          path: "/add", // Add new gig page
          element: <Add />,
        },
        {
          path: "/messages", // Messages list page
          element: <Messages />,
        },
        {
          path: "/message/:id", // Single message detail page, with a dynamic ID parameter
          element: <Message />,
        },

         {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register", // This route already exists in your Navbar, but you might want a more specific one for "Join"
      element: <Register />, // Make sure this points to your main Register page
    },
    {
        path: "/client-register", // Example route for Client Register
        element: <ClientRegister />,
    },
    {
        path: "/freelancer-register", // Example route for Freelancer Register
        element: <FreelancerRegister />,
    },
        
      ],
    },
  ]);

  return (
    <div>
      {/* The Toaster component is placed here once at the top level.
          It listens for toast notifications triggered by `toast.success()`, `toast.error()`, etc.,
          and displays them in the top-right corner of the screen. */}
      <Toaster position="top-right" />

      {/* The RouterProvider makes the routing context available to the entire application,
          rendering the appropriate components based on the current URL. */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
