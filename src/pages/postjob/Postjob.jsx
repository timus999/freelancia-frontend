"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Clock, Users } from "lucide-react"
import { jobAPI } from "../../api/job"
import "./Postjob.scss"

const PostProjectPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
    location: "",
    job_type: "fixed",
    deadline: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!formData.title || !formData.description || !formData.budget || !formData.category) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
        budget: Number.parseFloat(formData.budget),
        location: formData.location,
        job_type: formData.job_type,
        deadline: formData.deadline,
        category: formData.category,
      }

      const response = await jobAPI.createJob(jobData)

      // Success - redirect to job listing or success page
      alert("Job posted successfully!")
      navigate("/jobs") // or wherever you want to redirect
    } catch (error) {
      console.error("Error posting job:", error)
      setError(error.message || "Failed to post job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-project-page">
      <div className="post-project-container">
        {/* Header */}
        <div className="post-project-header">
          <h1 className="post-project-title">Post a Project</h1>
          <p className="post-project-subtitle">Tell us what you need done and receive free quotes from freelancers</p>
        </div>

        <div className="post-project-grid-wrapper">
          {/* Main Form */}
          <div className="post-project-form-section">
            <Card className="post-project-card">
              <CardHeader className="post-project-card-header">
                <CardTitle className="post-project-card-title">Project Details</CardTitle>
                <CardDescription className="post-project-card-description">
                  Provide details about your project to attract the right freelancers
                </CardDescription>
              </CardHeader>
              <CardContent className="post-project-form-content">
                {error && (
                  <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Project Title */}
                  <div className="form-group">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Build a responsive website for my business"
                      className="form-input"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="form-group">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger className="form-select-trigger">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                        <SelectItem value="design">Design & Creative</SelectItem>
                        <SelectItem value="writing">Writing & Translation</SelectItem>
                        <SelectItem value="marketing">Digital Marketing</SelectItem>
                        <SelectItem value="data-science">Data Science & Analytics</SelectItem>
                        <SelectItem value="admin">Admin Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Skills Required */}
                  <div className="form-group">
                    <Label htmlFor="skills">Skills Required</Label>
                    <Input
                      id="skills"
                      placeholder="e.g. React, Node.js, MongoDB"
                      className="form-input"
                      value={formData.skills}
                      onChange={(e) => handleChange("skills", e.target.value)}
                    />
                    <p className="form-helper-text">Add skills separated by commas</p>
                  </div>

                  {/* Project Description */}
                  <div className="form-group">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project in detail..."
                      className="form-textarea"
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div className="form-group">
                    <Label htmlFor="budget">Budget *</Label>
                    <div className="input-with-icon">
                      <DollarSign className="input-icon" />
                      <Input
                        id="budget"
                        placeholder="2000"
                        type="number"
                        className="input-field-with-icon"
                        value={formData.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div className="form-group">
                    <Label>Job Type *</Label>
                    <Select onValueChange={(value) => handleChange("job_type", value)} defaultValue="fixed">
                      <SelectTrigger className="form-select-trigger">
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
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g. Remote, New York, etc."
                      className="form-input"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  </div>

                  {/* Deadline */}
                  <div className="form-group">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      className="form-input"
                      value={formData.deadline}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="submit-section">
                    <Button type="submit" size="lg" className="submit-button" disabled={loading}>
                      {loading ? "Posting..." : "Post Project"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="post-project-sidebar">
            {/* Tips Card */}
            <Card className="post-project-card">
              <CardHeader>
                <CardTitle className="sidebar-card-title">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="sidebar-tips-content">
                <div className="tip-item">
                  <div className="tip-icon-wrapper blue-bg">
                    <Users className="tip-icon blue-text" />
                  </div>
                  <div className="tip-details">
                    <h4 className="tip-title">Be Specific</h4>
                    <p className="tip-description">Clear requirements attract better proposals</p>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon-wrapper green-bg">
                    <DollarSign className="tip-icon green-text" />
                  </div>
                  <div className="tip-details">
                    <h4 className="tip-title">Set Fair Budget</h4>
                    <p className="tip-description">Competitive budgets get more quality bids</p>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon-wrapper purple-bg">
                    <Clock className="tip-icon purple-text" />
                  </div>
                  <div className="tip-details">
                    <h4 className="tip-title">Realistic Timeline</h4>
                    <p className="tip-description">Allow adequate time for quality work</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostProjectPage
