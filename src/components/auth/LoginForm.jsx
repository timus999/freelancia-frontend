"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authAPI } from "../../api/auth"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await authAPI.login(formData)
      login(response) // Update auth context

      // Redirect based on user role
      if (response.role === "client") {
        navigate("/dashboard/client")
      } else if (response.role === "freelancer") {
        navigate("/dashboard/freelancer")
      } else {
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  )
}

export default LoginForm
