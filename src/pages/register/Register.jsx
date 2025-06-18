"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "./Register.scss"

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "freelancer",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signup } = useAuth()
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
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await signup({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      // Registration successful, redirect to login
      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      })
    } catch (error) {
      console.error("Registration error:", error)
      setError(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register">
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-header">
            <h1>Join Freelancia</h1>
            <p>Create your account and start your journey</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="user-type-selector">
            <div className="selector-header">
              <span>I want to:</span>
            </div>
            <div className="selector-options">
              <label className={`option ${formData.role === "freelancer" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="freelancer"
                  checked={formData.role === "freelancer"}
                  onChange={handleChange}
                />
                <div className="option-content">
                  <div className="option-icon">💼</div>
                  <div className="option-text">
                    <span className="title">Work as Freelancer</span>
                    <span className="desc">Offer services and earn money</span>
                  </div>
                </div>
              </label>
              <label className={`option ${formData.role === "client" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={formData.role === "client"}
                  onChange={handleChange}
                />
                <div className="option-content">
                  <div className="option-icon">🎯</div>
                  <div className="option-text">
                    <span className="title">Hire Freelancers</span>
                    <span className="desc">Find talent for your projects</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="form-footer">
            <p>
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
