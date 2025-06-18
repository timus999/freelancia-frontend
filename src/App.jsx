"use client"
import { AuthProvider } from "./contexts/AuthContext"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Gigs from "./pages/gigs/Gigs"
import Orders from "./pages/orders/Orders"
import Mygigs from "./pages/mygigs/Mygigs"
import Gig from "./pages/gig/Gig"
import Add from "./pages/add/Add"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Findjob from "./pages/findjob/Findjob"
import Postjob from "./pages/postjob/Postjob"
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ProtectedRoute from "./routes/ProtectedRoute"
import "./App.scss"

function App() {
  const Layout = () => {
    const location = useLocation()
    return (
      <AuthProvider>
        <div className="app" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ flex: 1 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>
      </AuthProvider>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: (
            <ProtectedRoute>
              <Gigs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/gig/:id",
          element: (
            <ProtectedRoute>
              <Gig />
            </ProtectedRoute>
          ),
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mygigs",
          element: (
            <ProtectedRoute requiredRole="freelancer">
              <Mygigs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add",
          element: (
            <ProtectedRoute requiredRole="freelancer">
              <Add />
            </ProtectedRoute>
          ),
        },
        {
          path: "/messages",
          element: (
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          ),
        },
        {
          path: "/message/:id",
          element: (
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/findjob",
          element: (
            <ProtectedRoute requiredRole="freelancer">
              <Findjob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/postjob",
          element: (
            <ProtectedRoute requiredRole="client">
              <Postjob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
export default App
