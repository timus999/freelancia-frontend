"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../api/auth"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      if (authAPI.isAuthenticated()) {
        // Try to fetch user profile to verify token is still valid
        const profile = await authAPI.getBasicProfile()
        setUser({
          ...profile,
          role: authAPI.getUserRole(),
          id: authAPI.getUserId(),
        })
        setIsAuthenticated(true)
      }
    } catch (error) {
      // Token might be expired or invalid
      console.error("Auth check failed:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      setUser({
        id: response.user_id,
        email: response.email,
        role: response.role,
        ...response.user,
      })
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updateProfile = async () => {
    try {
      const profile = await authAPI.getBasicProfile()
      setUser((prevUser) => ({
        ...prevUser,
        ...profile,
      }))
      return profile
    } catch (error) {
      throw error
    }
  }

  const getVerifiedProfile = async () => {
    try {
      return await authAPI.getVerifiedProfile()
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    getVerifiedProfile,
    checkAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
