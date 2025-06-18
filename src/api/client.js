import { apiClient } from "./client.js"

export const authAPI = {
  // Sign up new user
  signup: async (userData) => {
    try {
      const response = await apiClient.post("/signup", {
        email: userData.email,
        password: userData.password,
        role: userData.role, // 'client' or 'freelancer'
      })
      return response
    } catch (error) {
      throw new Error(error.message || "Signup failed")
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/login", {
        email: credentials.email,
        password: credentials.password,
      })

      if (response.token) {
        localStorage.setItem("authToken", response.token)
        localStorage.setItem("userRole", response.role)
        localStorage.setItem("userId", response.user_id)
      }

      return response
    } catch (error) {
      throw new Error(error.message || "Login failed")
    }
  },

  // Logout user
  logout: async () => {
    try {
      await apiClient.post("/logout")
      localStorage.removeItem("authToken")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userId")
      return { success: true }
    } catch (error) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem("authToken")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userId")
      throw new Error(error.message || "Logout failed")
    }
  },

  // Get basic profile
  getBasicProfile: async () => {
    try {
      return await apiClient.get("/profile/basic")
    } catch (error) {
      throw new Error(error.message || "Failed to fetch profile")
    }
  },

  // Get verified profile
  getVerifiedProfile: async () => {
    try {
      return await apiClient.get("/profile/verified")
    } catch (error) {
      throw new Error(error.message || "Failed to fetch verified profile")
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken")
  },

  // Get user role
  getUserRole: () => {
    return localStorage.getItem("userRole")
  },

  // Get user ID
  getUserId: () => {
    return localStorage.getItem("userId")
  },
}
