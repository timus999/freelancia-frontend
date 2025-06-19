"use client"
import { useAuth } from "../contexts/AuthContext"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children, requireFreelancer = false, requireClient = false }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireFreelancer && user.role !== "freelancer") {
    return <Navigate to="/client-profile" replace />
  }

  if (requireClient && user.role !== "client") {
    return <Navigate to="/freelancer-profile" replace />
  }

  return children
}

export default ProtectedRoute
