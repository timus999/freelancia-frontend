"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authAPI } from "../../api/auth"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "freelancer",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await authAPI.signup({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      // Redirect to login page after successful signup
      navigate("/login", {
        state: { message: "Account created successfully! Please log in." },
      })
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

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <Label>I want to:</Label>
        <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="freelancer" id="freelancer" />
            <Label htmlFor="freelancer">Work as a Freelancer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="client" id="client" />
            <Label htmlFor="client">Hire Freelancers</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  )
}

export default RegisterForm
