// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useToast } from "../../hooks/useToast"
// import "./Login.scss"

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     userType: "freelancer", // Default to freelancer
//   })
//   const [loading, setLoading] = useState(false)
//   const { showToast } = useToast()
//   const navigate = useNavigate()

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     // Validation
//     if (!formData.email || !formData.email.includes("@")) {
//       showToast("Please enter a valid email", "error")
//       setLoading(false)
//       return
//     }
//     if (!formData.password) {
//       showToast("Please enter a password", "error")
//       setLoading(false)
//       return
//     }

//     try {
//       // For demo purposes, simulate successful login
//       // Replace this with actual API call when backend is ready
//       const mockUser = {
//         id: 1,
//         username: formData.email.split("@")[0],
//         email: formData.email,
//         isFreelancer: formData.userType === "freelancer",
//         token: "mock-jwt-token",
//       }

//       localStorage.setItem("currentUser", JSON.stringify(mockUser))
//       localStorage.setItem("token", mockUser.token)

//       showToast("Login successful!", "success")
//       // Redirect to appropriate profile based on user type
//       if (formData.userType === "freelancer") {
//         navigate("/freelancer-profile")
//       } else {
//         navigate("/client-profile")
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || "Login failed"
//       showToast(message, "error")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="login">
//       <div className="login-container">
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-header">
//             <h1>Welcome Back</h1>
//             <p>Sign in to your account</p>
//           </div>

//           <div className="user-type-selector">
//             <div className="selector-header">
//               <span>Login as:</span>
//             </div>
//             <div className="selector-options">
//               <label className={`option ${formData.userType === "freelancer" ? "active" : ""}`}>
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="freelancer"
//                   checked={formData.userType === "freelancer"}
//                   onChange={(e) => handleChange("userType", e.target.value)}
//                 />
//                 <div className="option-content">
//                   <div className="option-icon">👨‍💻</div>
//                   <span>Freelancer</span>
//                 </div>
//               </label>
//               <label className={`option ${formData.userType === "client" ? "active" : ""}`}>
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="client"
//                   checked={formData.userType === "client"}
//                   onChange={(e) => handleChange("userType", e.target.value)}
//                 />
//                 <div className="option-content">
//                   <div className="option-icon">🏢</div>
//                   <span>Client</span>
//                 </div>
//               </label>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={(e) => handleChange("email", e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={(e) => handleChange("password", e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Signing in..." : "Sign In"}
//           </button>

//           <div className="form-footer">
//             <p>
//               Don't have an account? <a href="/signup">Sign up here</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login


//routes correcrt
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { login } from "../../api/auth"
import "./Login.scss"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.email || !formData.email.includes("@")) {
      showToast("Please enter a valid email", "error")
      setLoading(false)
      return
    }
    if (!formData.password) {
      showToast("Please enter a password", "error")
      setLoading(false)
      return
    }

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      })

      // Store user data and token
      localStorage.setItem("currentUser", JSON.stringify(response.user))
      localStorage.setItem("token", response.token)

      showToast("Login successful!", "success")

      // Redirect based on user role
      if (response.user.role === "freelancer") {
        navigate("/freelancer-profile")
      } else {
        navigate("/client-profile")
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed"
      showToast(message, "error")
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

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
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
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="form-footer">
            <p>
              Don't have an account? <a href="/signup">Sign up here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
