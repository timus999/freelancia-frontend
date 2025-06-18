"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { authAPI } from "../../api/auth"
import "./Login.scss"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email")
      setLoading(false)
      return
    }
    if (!formData.password) {
      setError("Please enter a password")
      setLoading(false)
      return
    }

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      })

      // Login successful
      login(response.user, response.token)

      // Redirect based on user role
      if (response.user.role === "client") {
        navigate("/postjob")
      } else {
        navigate("/findjob")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="form-footer">
            <p>
              Don't have an account? <Link to="/register">Sign up here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
