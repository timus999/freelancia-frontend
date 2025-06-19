// "use client"

// import { createContext, useContext, useState, useEffect } from "react"
// import { login as apiLogin, register as apiRegister, logout as apiLogout } from "../api/auth"

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [token, setToken] = useState(null)

//   useEffect(() => {
//     // Check for existing auth on mount
//     const storedToken = localStorage.getItem("token")
//     const storedUser = localStorage.getItem("currentUser")

//     if (storedToken && storedUser) {
//       setToken(storedToken)
//       setUser(JSON.parse(storedUser))
//     }
//     setLoading(false)
//   }, [])

//   const login = async (credentials) => {
//     try {
//       const response = await apiLogin(credentials)
//       const { user: userData, token: authToken } = response

//       setUser(userData)
//       setToken(authToken)
//       localStorage.setItem("token", authToken)
//       localStorage.setItem("currentUser", JSON.stringify(userData))

//       return response
//     } catch (error) {
//       throw error
//     }
//   }

//   const register = async (userData) => {
//     try {
//       const response = await apiRegister(userData)
//       return response
//     } catch (error) {
//       throw error
//     }
//   }

//   const logout = async () => {
//     try {
//       await apiLogout()
//     } catch (error) {
//       console.error("Logout error:", error)
//     } finally {
//       setUser(null)
//       setToken(null)
//       localStorage.removeItem("token")
//       localStorage.removeItem("currentUser")
//       localStorage.removeItem("tempUser")
//     }
//   }

//   const updateUser = (userData) => {
//     setUser(userData)
//     localStorage.setItem("currentUser", JSON.stringify(userData))
//   }

//   const value = {
//     user,
//     token,
//     loading,
//     login,
//     register,
//     logout,
//     updateUser,
//     isAuthenticated: !!user,
//     isFreelancer: user?.role === "freelancer",
//     isClient: user?.role === "client",
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }


// "use client"

// import { createContext, useState, useEffect, useContext } from "react"
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
//   sendPasswordResetEmail,
// } from "firebase/auth"
// import { auth } from "../firebase"

// const AuthContext = createContext()

// export const useAuth = () => {
//   return useContext(AuthContext)
// }

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const signup = async (email, password, displayName) => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password)
//       // Update display name
//       await updateProfile(auth.currentUser, {
//         displayName: displayName,
//       })
//       setCurrentUser(auth.currentUser) // Update currentUser immediately
//     } catch (error) {
//       throw error
//     }
//   }

//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const logout = () => {
//     return signOut(auth)
//   }

//   const resetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email)
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user)
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     loading,
//     resetPassword,
//   }

//   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
// }



// "use client"

// import { createContext, useContext, useState, useEffect } from "react"
// import { login as apiLogin, register as apiRegister, logout as apiLogout, getProfile } from "../api/auth"

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [token, setToken] = useState(null)

//   useEffect(() => {
//     // Check for existing auth on mount
//     const storedToken = localStorage.getItem("token")
//     const storedUser = localStorage.getItem("currentUser")

//     if (storedToken && storedUser) {
//       setToken(storedToken)
//       setUser(JSON.parse(storedUser))
//     }
//     setLoading(false)
//   }, [])

//   const login = async (credentials) => {
//     try {
//       setLoading(true)
//       const response = await apiLogin(credentials)
//       const { user: userData, token: authToken } = response

//       setUser(userData)
//       setToken(authToken)
//       localStorage.setItem("token", authToken)
//       localStorage.setItem("currentUser", JSON.stringify(userData))

//       return response
//     } catch (error) {
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const register = async (userData) => {
//     try {
//       setLoading(true)
//       const response = await apiRegister(userData)
//       return response
//     } catch (error) {
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const logout = async () => {
//     try {
//       if (token) {
//         await apiLogout()
//       }
//     } catch (error) {
//       console.error("Logout error:", error)
//     } finally {
//       setUser(null)
//       setToken(null)
//       localStorage.removeItem("token")
//       localStorage.removeItem("currentUser")
//       localStorage.removeItem("tempUser")
//     }
//   }

//   const updateUser = (userData) => {
//     setUser(userData)
//     localStorage.setItem("currentUser", JSON.stringify(userData))
//   }

//   const refreshProfile = async () => {
//     try {
//       if (token) {
//         const profileData = await getProfile()
//         setUser(profileData)
//         localStorage.setItem("currentUser", JSON.stringify(profileData))
//       }
//     } catch (error) {
//       console.error("Failed to refresh profile:", error)
//     }
//   }

//   const value = {
//     user,
//     token,
//     loading,
//     login,
//     register,
//     logout,
//     updateUser,
//     refreshProfile,
//     isAuthenticated: !!user,
//     isFreelancer: user?.role === "freelancer",
//     isClient: user?.role === "client",
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }



"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, register as apiRegister, logout as apiLogout, getBasicProfile } from "../api/auth"

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
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for existing auth on mount
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("currentUser")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const response = await apiLogin(credentials)
      const { user: userData, token: authToken } = response

      setUser(userData)
      setToken(authToken)
      localStorage.setItem("token", authToken)
      localStorage.setItem("currentUser", JSON.stringify(userData))

      return response
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await apiRegister(userData)
      return response
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await apiLogout()
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem("token")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("tempUser")
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem("currentUser", JSON.stringify(userData))
  }

  const refreshProfile = async () => {
    try {
      if (token) {
        const profileData = await getBasicProfile()
        setUser(profileData)
        localStorage.setItem("currentUser", JSON.stringify(profileData))
      }
    } catch (error) {
      console.error("Failed to refresh profile:", error)
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshProfile,
    isAuthenticated: !!user,
    isFreelancer: user?.role === "freelancer",
    isClient: user?.role === "client",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
