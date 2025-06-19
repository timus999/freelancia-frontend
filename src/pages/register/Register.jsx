// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useToast } from "../../hooks/useToast"
// import "./Register.scss"

// function Register() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userType: "freelancer",
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
//     if (!formData.firstName || !formData.lastName) {
//       showToast("Please enter your full name", "error")
//       setLoading(false)
//       return
//     }
//     if (!formData.email || !formData.email.includes("@")) {
//       showToast("Please enter a valid email", "error")
//       setLoading(false)
//       return
//     }
//     if (formData.password.length < 6) {
//       showToast("Password must be at least 6 characters", "error")
//       setLoading(false)
//       return
//     }
//     if (formData.password !== formData.confirmPassword) {
//       showToast("Passwords do not match", "error")
//       setLoading(false)
//       return
//     }

//     try {
//       // For demo purposes, simulate successful registration
//       const mockUser = {
//         id: Date.now(),
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         isFreelancer: formData.userType === "freelancer",
//         profileComplete: false,
//       }

//       localStorage.setItem("tempUser", JSON.stringify(mockUser))
//       showToast("Registration successful! Please complete your profile.", "success")

//       // Navigate to profile creation based on user type
//       if (formData.userType === "freelancer") {
//         navigate("/create-freelancer-profile")
//       } else {
//         navigate("/create-client-profile")
//       }
//     } catch (error) {
//       showToast("Registration failed. Please try again.", "error")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="register">
//       <div className="register-container">
//         <form onSubmit={handleSubmit} className="register-form">
//           <div className="form-header">
//             <h1>Join Freelancia</h1>
//             <p>Create your account and start your journey</p>
//           </div>

//           <div className="user-type-selector">
//             <div className="selector-header">
//               <span>I want to:</span>
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
//                   <div className="option-icon">💼</div>
//                   <div className="option-text">
//                     <span className="title">Work as Freelancer</span>
//                     <span className="desc">Offer services and earn money</span>
//                   </div>
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
//                   <div className="option-icon">🎯</div>
//                   <div className="option-text">
//                     <span className="title">Hire Freelancers</span>
//                     <span className="desc">Find talent for your projects</span>
//                   </div>
//                 </div>
//               </label>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="firstName">First Name</label>
//               <input
//                 id="firstName"
//                 name="firstName"
//                 type="text"
//                 placeholder="Enter first name"
//                 value={formData.firstName}
//                 onChange={(e) => handleChange("firstName", e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="lastName">Last Name</label>
//               <input
//                 id="lastName"
//                 name="lastName"
//                 type="text"
//                 placeholder="Enter last name"
//                 value={formData.lastName}
//                 onChange={(e) => handleChange("lastName", e.target.value)}
//                 required
//               />
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
//               placeholder="Create a password"
//               value={formData.password}
//               onChange={(e) => handleChange("password", e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={(e) => handleChange("confirmPassword", e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="register-btn" disabled={loading}>
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//           <div className="form-footer">
//             <p>
//               Already have an account? <a href="/login">Sign in here</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register


//correct routes
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { register } from "../../api/auth"
import "./Register.scss"

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "freelancer",
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
    if (!formData.firstName || !formData.lastName) {
      showToast("Please enter your full name", "error")
      setLoading(false)
      return
    }
    if (!formData.email || !formData.email.includes("@")) {
      showToast("Please enter a valid email", "error")
      setLoading(false)
      return
    }
    if (formData.password.length < 6) {
      showToast("Password must be at least 6 characters", "error")
      setLoading(false)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error")
      setLoading(false)
      return
    }

    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      // Store user data
      const userData = {
        ...response.user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isFreelancer: formData.role === "freelancer",
        profileComplete: false,
      }

      localStorage.setItem("tempUser", JSON.stringify(userData))
      localStorage.setItem("token", response.token)

      showToast("Registration successful! Please complete your profile.", "success")

      // Navigate to profile creation based on user type
      if (formData.role === "freelancer") {
        navigate("/create-freelancer-profile")
      } else {
        navigate("/create-client-profile")
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Registration failed. Please try again.", "error")
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
                  onChange={(e) => handleChange("role", e.target.value)}
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
                  onChange={(e) => handleChange("role", e.target.value)}
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
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
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
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
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="form-footer">
            <p>
              Already have an account? <a href="/login">Sign in here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
