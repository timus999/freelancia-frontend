// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useToast } from "../../hooks/useToast"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Upload, DollarSign, Clock, Users, CheckCircle, ArrowRight, Star } from "lucide-react"

// import "./Postjob.scss"

// const PostProjectPage = () => {
//   const navigate = useNavigate()
//   const { showToast } = useToast()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)
//   const [postedProject, setPostedProject] = useState(null)
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     skills: "",
//     description: "",
//     budgetType: "fixed",
//     minBudget: "",
//     maxBudget: "",
//     timeline: "",
//     experienceLevel: "intermediate",
//     featured: false,
//     urgent: false,
//     sealed: false,
//     attachments: [],
//   })

//   const [errors, setErrors] = useState({})

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))

//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.title.trim()) {
//       newErrors.title = "Project title is required"
//     } else if (formData.title.length < 10) {
//       newErrors.title = "Title must be at least 10 characters"
//     }

//     if (!formData.category) {
//       newErrors.category = "Please select a category"
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = "Project description is required"
//     } else if (formData.description.length < 50) {
//       newErrors.description = "Description must be at least 50 characters"
//     }

//     if (!formData.minBudget || !formData.maxBudget) {
//       newErrors.budget = "Budget range is required"
//     } else if (Number.parseInt(formData.minBudget) >= Number.parseInt(formData.maxBudget)) {
//       newErrors.budget = "Maximum budget must be greater than minimum budget"
//     }

//     if (!formData.timeline) {
//       newErrors.timeline = "Project timeline is required"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const calculateTotalCost = () => {
//     let total = 0
//     if (formData.featured) total += 19
//     if (formData.urgent) total += 9
//     return total
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       showToast("Please fix the errors in the form", "error")
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       // Get current user
//       const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

//       if (!currentUser.id) {
//         showToast("Please log in to post a project", "error")
//         navigate("/login")
//         return
//       }

//       // Create new project object
//       const newProject = {
//         id: Date.now(), // Simple ID generation
//         title: formData.title,
//         description: formData.description,
//         category: formData.category,
//         skills: formData.skills
//           .split(",")
//           .map((skill) => skill.trim())
//           .filter((skill) => skill),
//         budget: `$${formData.minBudget} - $${formData.maxBudget}`,
//         budgetType: formData.budgetType,
//         minBudget: Number.parseInt(formData.minBudget),
//         maxBudget: Number.parseInt(formData.maxBudget),
//         timeline: formData.timeline,
//         experienceLevel: formData.experienceLevel,
//         status: "Active",
//         postedDate: new Date().toISOString(),
//         proposals: 0,
//         clientId: currentUser.id,
//         clientName: `${currentUser.firstName} ${currentUser.lastName}`,
//         featured: formData.featured,
//         urgent: formData.urgent,
//         sealed: formData.sealed,
//         attachments: formData.attachments,
//         deadline: getDeadlineFromTimeline(formData.timeline),
//       }

//       // Get existing posted jobs from localStorage
//       const existingJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]")

//       // Add new project to the list
//       const updatedJobs = [newProject, ...existingJobs]

//       // Save back to localStorage
//       localStorage.setItem("postedJobs", JSON.stringify(updatedJobs))

//       // Update user's posted projects count
//       const updatedUser = {
//         ...currentUser,
//         totalProjectsPosted: (currentUser.totalProjectsPosted || 0) + 1,
//       }
//       localStorage.setItem("currentUser", JSON.stringify(updatedUser))

//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // Set posted project and show success
//       setPostedProject(newProject)
//       setShowSuccess(true)
//       showToast("Project posted successfully!", "success")
//     } catch (error) {
//       console.error("Error posting project:", error)
//       showToast("Failed to post project. Please try again.", "error")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const getDeadlineFromTimeline = (timeline) => {
//     const now = new Date()
//     switch (timeline) {
//       case "asap":
//         return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week
//       case "1-2weeks":
//         return new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString() // 2 weeks
//       case "1month":
//         return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString() // 1 month
//       case "2-3months":
//         return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString() // 3 months
//       case "3+months":
//         return new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000).toISOString() // 4 months
//       default:
//         return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString() // Default 1 month
//     }
//   }

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files)
//     setFormData((prev) => ({
//       ...prev,
//       attachments: [...prev.attachments, ...files],
//     }))
//   }

//   const removeAttachment = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       attachments: prev.attachments.filter((_, i) => i !== index),
//     }))
//   }

//   const handleViewProfile = () => {
//     navigate("/client-profile")
//   }

//   const handlePostAnother = () => {
//     setShowSuccess(false)
//     setPostedProject(null)
//     setFormData({
//       title: "",
//       category: "",
//       skills: "",
//       description: "",
//       budgetType: "fixed",
//       minBudget: "",
//       maxBudget: "",
//       timeline: "",
//       experienceLevel: "intermediate",
//       featured: false,
//       urgent: false,
//       sealed: false,
//       attachments: [],
//     })
//     setErrors({})
//   }

//   // Success Page
//   if (showSuccess && postedProject) {
//     return (
//       <div className="post-project-page">
//         <div className="success-container">
//           <Card className="success-card">
//             <CardContent className="success-content">
//               <div className="success-icon">
//                 <CheckCircle className="icon" />
//               </div>
//               <h1 className="success-title">Project Posted Successfully!</h1>
//               <p className="success-subtitle">
//                 Your project is now live and freelancers can start submitting proposals.
//               </p>

//               <div className="project-summary">
//                 <h3>Project Summary</h3>
//                 <div className="summary-item">
//                   <span className="label">Title:</span>
//                   <span className="value">{postedProject.title}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="label">Budget:</span>
//                   <span className="value">{postedProject.budget}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="label">Timeline:</span>
//                   <span className="value">{postedProject.timeline}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="label">Category:</span>
//                   <span className="value">{postedProject.category}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span className="label">Project ID:</span>
//                   <span className="value">#{postedProject.id}</span>
//                 </div>
//               </div>

//               <div className="success-stats">
//                 <div className="stat">
//                   <Star className="icon" />
//                   <span>Your project will be featured to top freelancers</span>
//                 </div>
//                 <div className="stat">
//                   <Users className="icon" />
//                   <span>Expect proposals within 24 hours</span>
//                 </div>
//                 <div className="stat">
//                   <Clock className="icon" />
//                   <span>Average response time: 2-4 hours</span>
//                 </div>
//               </div>

//               <div className="success-actions">
//                 <Button onClick={handleViewProfile} className="primary-btn">
//                   <Users className="icon" />
//                   View My Profile
//                   <ArrowRight className="icon" />
//                 </Button>
//                 <Button onClick={handlePostAnother} variant="outline" className="secondary-btn">
//                   Post Another Project
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="post-project-page">
//       <div className="post-project-container">
//         {/* Header */}
//         <div className="post-project-header">
//           <h1 className="post-project-title">Post a Project</h1>
//           <p className="post-project-subtitle">Tell us what you need done and receive free quotes from freelancers</p>
//         </div>

//         <form onSubmit={handleSubmit} className="post-project-form">
//           <div className="form-grid">
//             {/* Main Form */}
//             <div className="form-section">
//               <Card className="form-card">
//                 <CardHeader>
//                   <CardTitle>Project Details</CardTitle>
//                   <CardDescription>Provide details about your project to attract the right freelancers</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   {/* Project Title */}
//                   <div className="form-group">
//                     <Label htmlFor="title">Project Title *</Label>
//                     <Input
//                       id="title"
//                       placeholder="e.g. Build a responsive website for my business"
//                       className={errors.title ? "error" : ""}
//                       value={formData.title}
//                       onChange={(e) => handleInputChange("title", e.target.value)}
//                     />
//                     {errors.title && <span className="error-text">{errors.title}</span>}
//                     <span className="helper-text">A clear, descriptive title helps attract the right freelancers</span>
//                   </div>

//                   {/* Category */}
//                   <div className="form-group">
//                     <Label htmlFor="category">Category *</Label>
//                     <Select onValueChange={(value) => handleInputChange("category", value)}>
//                       <SelectTrigger className={errors.category ? "error" : ""}>
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="web-development">Web Development</SelectItem>
//                         <SelectItem value="mobile-development">Mobile Development</SelectItem>
//                         <SelectItem value="design">Design & Creative</SelectItem>
//                         <SelectItem value="writing">Writing & Translation</SelectItem>
//                         <SelectItem value="marketing">Digital Marketing</SelectItem>
//                         <SelectItem value="data">Data Science & Analytics</SelectItem>
//                         <SelectItem value="admin">Admin Support</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {errors.category && <span className="error-text">{errors.category}</span>}
//                   </div>

//                   {/* Skills Required */}
//                   <div className="form-group">
//                     <Label htmlFor="skills">Skills Required</Label>
//                     <Input
//                       id="skills"
//                       placeholder="e.g. React, Node.js, MongoDB"
//                       value={formData.skills}
//                       onChange={(e) => handleInputChange("skills", e.target.value)}
//                     />
//                     <span className="helper-text">Add skills separated by commas</span>
//                   </div>

//                   {/* Project Description */}
//                   <div className="form-group">
//                     <Label htmlFor="description">Project Description *</Label>
//                     <Textarea
//                       id="description"
//                       placeholder="Describe your project in detail. Include what you want to achieve, any specific requirements, and what deliverables you expect..."
//                       className={errors.description ? "error" : ""}
//                       value={formData.description}
//                       onChange={(e) => handleInputChange("description", e.target.value)}
//                       rows={6}
//                     />
//                     {errors.description && <span className="error-text">{errors.description}</span>}
//                     <span className="helper-text">Minimum 50 characters ({formData.description.length}/50)</span>
//                   </div>

//                   {/* File Attachments */}
//                   <div className="form-group">
//                     <Label>Attachments (Optional)</Label>
//                     <div className="file-upload">
//                       <Upload className="upload-icon" />
//                       <p>Drag and drop files here or click to browse</p>
//                       <span className="file-info">Supported: PDF, DOC, PNG, JPG (Max 10MB)</span>
//                       <input
//                         type="file"
//                         multiple
//                         accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
//                         onChange={handleFileUpload}
//                         style={{ display: "none" }}
//                         id="file-upload"
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => document.getElementById("file-upload").click()}
//                       >
//                         Choose Files
//                       </Button>
//                     </div>

//                     {formData.attachments.length > 0 && (
//                       <div className="uploaded-files">
//                         {formData.attachments.map((file, index) => (
//                           <div key={index} className="file-item">
//                             <span>{file.name}</span>
//                             <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
//                               Remove
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Budget */}
//                   <div className="form-group">
//                     <Label>Budget *</Label>
//                     <RadioGroup
//                       value={formData.budgetType}
//                       onValueChange={(value) => handleInputChange("budgetType", value)}
//                       className="budget-type"
//                     >
//                       <div className="radio-item">
//                         <RadioGroupItem value="fixed" id="fixed" />
//                         <Label htmlFor="fixed">Fixed Price Project</Label>
//                       </div>
//                       <div className="radio-item">
//                         <RadioGroupItem value="hourly" id="hourly" />
//                         <Label htmlFor="hourly">Hourly Rate</Label>
//                       </div>
//                     </RadioGroup>
//                     <div className="budget-inputs">
//                       <div className="budget-input">
//                         <Label htmlFor="min-budget">Minimum Budget</Label>
//                         <div className="input-with-icon">
//                           <DollarSign className="icon" />
//                           <Input
//                             id="min-budget"
//                             placeholder="500"
//                             type="number"
//                             className={errors.budget ? "error" : ""}
//                             value={formData.minBudget}
//                             onChange={(e) => handleInputChange("minBudget", e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className="budget-input">
//                         <Label htmlFor="max-budget">Maximum Budget</Label>
//                         <div className="input-with-icon">
//                           <DollarSign className="icon" />
//                           <Input
//                             id="max-budget"
//                             placeholder="2000"
//                             type="number"
//                             className={errors.budget ? "error" : ""}
//                             value={formData.maxBudget}
//                             onChange={(e) => handleInputChange("maxBudget", e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     {errors.budget && <span className="error-text">{errors.budget}</span>}
//                   </div>

//                   {/* Timeline */}
//                   <div className="form-group">
//                     <Label htmlFor="timeline">Project Timeline *</Label>
//                     <Select onValueChange={(value) => handleInputChange("timeline", value)}>
//                       <SelectTrigger className={errors.timeline ? "error" : ""}>
//                         <SelectValue placeholder="Select timeline" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="asap">ASAP (Less than 1 week)</SelectItem>
//                         <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
//                         <SelectItem value="1month">1 month</SelectItem>
//                         <SelectItem value="2-3months">2-3 months</SelectItem>
//                         <SelectItem value="3+months">3+ months</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {errors.timeline && <span className="error-text">{errors.timeline}</span>}
//                   </div>

//                   {/* Experience Level */}
//                   <div className="form-group">
//                     <Label>Freelancer Experience Level *</Label>
//                     <RadioGroup
//                       value={formData.experienceLevel}
//                       onValueChange={(value) => handleInputChange("experienceLevel", value)}
//                       className="experience-level"
//                     >
//                       <div className="radio-item">
//                         <RadioGroupItem value="entry" id="entry" />
//                         <Label htmlFor="entry">Entry Level ($10-30/hr)</Label>
//                       </div>
//                       <div className="radio-item">
//                         <RadioGroupItem value="intermediate" id="intermediate" />
//                         <Label htmlFor="intermediate">Intermediate ($30-60/hr)</Label>
//                       </div>
//                       <div className="radio-item">
//                         <RadioGroupItem value="expert" id="expert" />
//                         <Label htmlFor="expert">Expert ($60+/hr)</Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   {/* Additional Options */}
//                   <div className="form-group">
//                     <Label>Additional Options</Label>
//                     <div className="additional-options">
//                       <div className="checkbox-item">
//                         <Checkbox
//                           id="featured"
//                           checked={formData.featured}
//                           onCheckedChange={(checked) => handleInputChange("featured", checked)}
//                         />
//                         <Label htmlFor="featured">Make this project featured (+$19)</Label>
//                       </div>
//                       <div className="checkbox-item">
//                         <Checkbox
//                           id="urgent"
//                           checked={formData.urgent}
//                           onCheckedChange={(checked) => handleInputChange("urgent", checked)}
//                         />
//                         <Label htmlFor="urgent">Mark as urgent (+$9)</Label>
//                       </div>
//                       <div className="checkbox-item">
//                         <Checkbox
//                           id="sealed"
//                           checked={formData.sealed}
//                           onCheckedChange={(checked) => handleInputChange("sealed", checked)}
//                         />
//                         <Label htmlFor="sealed">Sealed bidding (Hide bids from other freelancers)</Label>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Cost Summary */}
//                   {(formData.featured || formData.urgent) && (
//                     <div className="cost-summary">
//                       <h4>Additional Costs</h4>
//                       {formData.featured && <p>Featured listing: $19</p>}
//                       {formData.urgent && <p>Urgent marking: $9</p>}
//                       <p className="total">Total additional cost: ${calculateTotalCost()}</p>
//                     </div>
//                   )}

//                   {/* Submit Button */}
//                   <div className="submit-section">
//                     <Button type="submit" size="lg" className="submit-btn" disabled={isSubmitting}>
//                       {isSubmitting ? (
//                         <>
//                           <div className="spinner"></div>
//                           Posting Project...
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="icon" />
//                           Post Project
//                         </>
//                       )}
//                     </Button>
//                     <p className="agreement">By posting, you agree to our Terms of Service and Privacy Policy</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Sidebar */}
//             <div className="sidebar">
//               {/* Tips Card */}
//               <Card className="tips-card">
//                 <CardHeader>
//                   <CardTitle>Tips for Success</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="tip">
//                     <div className="tip-icon blue">
//                       <Users className="icon" />
//                     </div>
//                     <div className="tip-content">
//                       <h4>Be Specific</h4>
//                       <p>Clear requirements attract better proposals</p>
//                     </div>
//                   </div>
//                   <div className="tip">
//                     <div className="tip-icon green">
//                       <DollarSign className="icon" />
//                     </div>
//                     <div className="tip-content">
//                       <h4>Set Fair Budget</h4>
//                       <p>Competitive budgets get more quality bids</p>
//                     </div>
//                   </div>
//                   <div className="tip">
//                     <div className="tip-icon purple">
//                       <Clock className="icon" />
//                     </div>
//                     <div className="tip-content">
//                       <h4>Realistic Timeline</h4>
//                       <p>Allow adequate time for quality work</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Pricing Card */}
//               <Card className="pricing-card">
//                 <CardHeader>
//                   <CardTitle>How Pricing Works</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="pricing-item">
//                     <span>Project posting</span>
//                     <span className="price">Free</span>
//                   </div>
//                   <div className="pricing-item">
//                     <span>Service fee</span>
//                     <span className="price">3% of project value</span>
//                   </div>
//                   <div className="pricing-item">
//                     <span>Payment processing</span>
//                     <span className="price">2.9% + $0.30</span>
//                   </div>
//                   <div className="pricing-total">
//                     <span>You pay only when satisfied</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default PostProjectPage


//routes correct
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { useJobs } from "../../hooks/useJobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, ArrowRight, Star, Users, Clock } from "lucide-react"
import "./Postjob.scss"

const PostProjectPage = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { createNewJob } = useJobs()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [postedProject, setPostedProject] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
    location: "",
    jobType: "fixed",
    deadline: "",
    category: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required"
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    }

    if (!formData.budget) {
      newErrors.budget = "Budget is required"
    } else if (Number.parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Budget must be greater than 0"
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error")
      return
    }

    setIsSubmitting(true)

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill)

      const newProject = await createNewJob({
        title: formData.title,
        description: formData.description,
        skills: skillsArray,
        budget: Number.parseFloat(formData.budget),
        location: formData.location,
        jobType: formData.jobType,
        deadline: formData.deadline,
        category: formData.category,
      })

      setPostedProject({
        ...formData,
        id: newProject.job_id,
        skills: skillsArray,
      })
      setShowSuccess(true)
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewProfile = () => {
    navigate("/client-profile")
  }

  const handlePostAnother = () => {
    setShowSuccess(false)
    setPostedProject(null)
    setFormData({
      title: "",
      description: "",
      skills: "",
      budget: "",
      location: "",
      jobType: "fixed",
      deadline: "",
      category: "",
    })
    setErrors({})
  }

  // Success Page
  if (showSuccess && postedProject) {
    return (
      <div className="post-project-page">
        <div className="success-container">
          <Card className="success-card">
            <CardContent className="success-content">
              <div className="success-icon">
                <CheckCircle className="icon" />
              </div>
              <h1 className="success-title">Project Posted Successfully!</h1>
              <p className="success-subtitle">
                Your project is now live and freelancers can start submitting proposals.
              </p>

              <div className="project-summary">
                <h3>Project Summary</h3>
                <div className="summary-item">
                  <span className="label">Title:</span>
                  <span className="value">{postedProject.title}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Budget:</span>
                  <span className="value">${postedProject.budget}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Deadline:</span>
                  <span className="value">{new Date(postedProject.deadline).toLocaleDateString()}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Category:</span>
                  <span className="value">{postedProject.category}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Project ID:</span>
                  <span className="value">#{postedProject.id}</span>
                </div>
              </div>

              <div className="success-stats">
                <div className="stat">
                  <Star className="icon" />
                  <span>Your project will be featured to top freelancers</span>
                </div>
                <div className="stat">
                  <Users className="icon" />
                  <span>Expect proposals within 24 hours</span>
                </div>
                <div className="stat">
                  <Clock className="icon" />
                  <span>Average response time: 2-4 hours</span>
                </div>
              </div>

              <div className="success-actions">
                <Button onClick={handleViewProfile} className="primary-btn">
                  <Users className="icon" />
                  View My Profile
                  <ArrowRight className="icon" />
                </Button>
                <Button onClick={handlePostAnother} variant="outline" className="secondary-btn">
                  Post Another Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="post-project-page">
      <div className="post-project-container">
        {/* Header */}
        <div className="post-project-header">
          <h1 className="post-project-title">Post a Project</h1>
          <p className="post-project-subtitle">Tell us what you need done and receive free quotes from freelancers</p>
        </div>

        <form onSubmit={handleSubmit} className="post-project-form">
          <div className="form-grid">
            {/* Main Form */}
            <div className="form-section">
              <Card className="form-card">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>Provide details about your project to attract the right freelancers</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Project Title */}
                  <div className="form-group">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Build a responsive website for my business"
                      className={errors.title ? "error" : ""}
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                    <span className="helper-text">A clear, descriptive title helps attract the right freelancers</span>
                  </div>

                  {/* Category */}
                  <div className="form-group">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "error" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webdesign">Web Design</SelectItem>
                        <SelectItem value="webdevelopment">Web Development</SelectItem>
                        <SelectItem value="mobileapp">Mobile App Development</SelectItem>
                        <SelectItem value="design">Design & Creative</SelectItem>
                        <SelectItem value="writing">Writing & Translation</SelectItem>
                        <SelectItem value="marketing">Digital Marketing</SelectItem>
                        <SelectItem value="datascience">Data Science & Analytics</SelectItem>
                        <SelectItem value="admin">Admin Support</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <span className="error-text">{errors.category}</span>}
                  </div>

                  {/* Skills Required */}
                  <div className="form-group">
                    <Label htmlFor="skills">Skills Required</Label>
                    <Input
                      id="skills"
                      placeholder="e.g. React, Node.js, MongoDB"
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                    />
                    <span className="helper-text">Add skills separated by commas</span>
                  </div>

                  {/* Project Description */}
                  <div className="form-group">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project in detail. Include what you want to achieve, any specific requirements, and what deliverables you expect..."
                      className={errors.description ? "error" : ""}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={6}
                    />
                    {errors.description && <span className="error-text">{errors.description}</span>}
                    <span className="helper-text">Minimum 50 characters ({formData.description.length}/50)</span>
                  </div>

                  {/* Budget */}
                  <div className="form-group">
                    <Label htmlFor="budget">Budget ($) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      step="0.01"
                      placeholder="Enter project budget"
                      className={errors.budget ? "error" : ""}
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                    />
                    {errors.budget && <span className="error-text">{errors.budget}</span>}
                  </div>

                  {/* Job Type */}
                  <div className="form-group">
                    <Label>Job Type *</Label>
                    <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="form-group">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g. Remote, New York, USA"
                      className={errors.location ? "error" : ""}
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                    {errors.location && <span className="error-text">{errors.location}</span>}
                  </div>

                  {/* Deadline */}
                  <div className="form-group">
                    <Label htmlFor="deadline">Project Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      className={errors.deadline ? "error" : ""}
                      value={formData.deadline}
                      onChange={(e) => handleInputChange("deadline", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.deadline && <span className="error-text">{errors.deadline}</span>}
                  </div>

                  {/* Submit Button */}
                  <div className="submit-section">
                    <Button type="submit" size="lg" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          Posting Project...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="icon" />
                          Post Project
                        </>
                      )}
                    </Button>
                    <p className="agreement">By posting, you agree to our Terms of Service and Privacy Policy</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostProjectPage
