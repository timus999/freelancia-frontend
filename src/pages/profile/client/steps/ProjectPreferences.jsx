"use client"

import { useState } from "react"

function ProjectPreferences({ data, onChange, onSubmit, onPrevious, loading }) {
  const [formData, setFormData] = useState({
    projectTypes: data.projectTypes || [],
    budgetRange: data.budgetRange || "",
    preferredCommunication: data.preferredCommunication || "",
    projectFrequency: data.projectFrequency || "",
  })

  const [errors, setErrors] = useState({})

  const projectTypeOptions = [
    "Web Development",
    "Mobile App Development",
    "Design & Creative",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "Video Production",
    "Consulting",
    "Virtual Assistant",
    "Translation",
  ]

  const budgetRanges = [
    "Under $500",
    "$500 - $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "Over $25,000",
  ]

  const communicationOptions = ["Email", "Slack", "Microsoft Teams", "Zoom", "Phone Calls", "Project Management Tools"]

  const frequencyOptions = ["One-time projects", "Monthly projects", "Quarterly projects", "Ongoing work", "As needed"]

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleProjectTypeChange = (projectType) => {
    const updatedTypes = formData.projectTypes.includes(projectType)
      ? formData.projectTypes.filter((type) => type !== projectType)
      : [...formData.projectTypes, projectType]

    setFormData((prev) => ({ ...prev, projectTypes: updatedTypes }))
    if (errors.projectTypes) {
      setErrors((prev) => ({ ...prev, projectTypes: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.projectTypes.length === 0) {
      newErrors.projectTypes = "Please select at least one project type"
    }
    if (!formData.budgetRange) {
      newErrors.budgetRange = "Budget range is required"
    }
    if (!formData.preferredCommunication) {
      newErrors.preferredCommunication = "Preferred communication method is required"
    }
    if (!formData.projectFrequency) {
      newErrors.projectFrequency = "Project frequency is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onChange(formData)
      onSubmit()
    }
  }

  return (
    <div className="step-form">
      <div className="form-header">
        <h2>Project Preferences</h2>
        <p>Help us understand your project needs and preferences</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Types of Projects You're Interested In *</label>
          <div className="checkbox-grid">
            {projectTypeOptions.map((type) => (
              <label key={type} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.projectTypes.includes(type)}
                  onChange={() => handleProjectTypeChange(type)}
                />
                <span className="checkmark"></span>
                {type}
              </label>
            ))}
          </div>
          {errors.projectTypes && <span className="error-text">{errors.projectTypes}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="budgetRange">Typical Budget Range *</label>
          <select
            id="budgetRange"
            value={formData.budgetRange}
            onChange={(e) => handleChange("budgetRange", e.target.value)}
          >
            <option value="">Select your typical budget range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.budgetRange && <span className="error-text">{errors.budgetRange}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="preferredCommunication">Preferred Communication Method *</label>
          <select
            id="preferredCommunication"
            value={formData.preferredCommunication}
            onChange={(e) => handleChange("preferredCommunication", e.target.value)}
          >
            <option value="">Select preferred communication method</option>
            {communicationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.preferredCommunication && <span className="error-text">{errors.preferredCommunication}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="projectFrequency">Project Frequency *</label>
          <select
            id="projectFrequency"
            value={formData.projectFrequency}
            onChange={(e) => handleChange("projectFrequency", e.target.value)}
          >
            <option value="">Select project frequency</option>
            {frequencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.projectFrequency && <span className="error-text">{errors.projectFrequency}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onPrevious}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating Profile..." : "Complete Profile"}
        </button>
      </div>
    </div>
  )
}

export default ProjectPreferences
