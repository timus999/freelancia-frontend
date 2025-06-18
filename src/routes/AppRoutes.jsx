"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import ProtectedRoute from "./ProtectedRoute"

// Pages
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Gigs from "../pages/gigs/Gigs"
import Gig from "../pages/gig/Gig"
import Add from "../pages/add/Add"
import Orders from "../pages/orders/Orders"
import Messages from "../pages/messages/Messages"
import Message from "../pages/message/Message"
import MyGigs from "../pages/myGigs/MyGigs"
import Findjob from "../pages/findjob/Findjob"
import Postjob from "../pages/postjob/Postjob"

// Components
import JobList from "../components/jobs/JobList"
import JobForm from "../components/jobs/JobForm"
import ProposalForm from "../components/proposals/ProposalForm"
import ProposalList from "../components/proposals/ProposalList"

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/gigs" element={<Gigs />} />
      <Route path="/gig/:id" element={<Gig />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/findjob" element={<Findjob />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {user?.role === "client" ? <Navigate to="/dashboard/client" /> : <Navigate to="/dashboard/freelancer" />}
          </ProtectedRoute>
        }
      />

      {/* Client-specific routes */}
      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute requiredRole="client">
            <div>Client Dashboard</div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/postjob"
        element={
          <ProtectedRoute requiredRole="client">
            <Postjob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/new"
        element={
          <ProtectedRoute requiredRole="client">
            <JobForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:jobId/proposals"
        element={
          <ProtectedRoute requiredRole="client">
            <ProposalList type="job" />
          </ProtectedRoute>
        }
      />

      {/* Freelancer-specific routes */}
      <Route
        path="/dashboard/freelancer"
        element={
          <ProtectedRoute requiredRole="freelancer">
            <div>Freelancer Dashboard</div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/proposals/new"
        element={
          <ProtectedRoute requiredRole="freelancer">
            <ProposalForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/proposals/new/:jobId"
        element={
          <ProtectedRoute requiredRole="freelancer">
            <ProposalForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/proposals/me"
        element={
          <ProtectedRoute requiredRole="freelancer">
            <ProposalList type="my" />
          </ProtectedRoute>
        }
      />

      {/* Shared protected routes */}
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <Add />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/message/:id"
        element={
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mygigs"
        element={
          <ProtectedRoute>
            <MyGigs />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
