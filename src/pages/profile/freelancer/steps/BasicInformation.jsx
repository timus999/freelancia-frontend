"use client"

import { useState } from "react"

function BasicInformation({ data, onChange, onNext }) {
  const [formData, setFormData] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    profession: data.profession || "",
    location: data.location || "",
    bio: data.bio || "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.profession.trim()) {
      newErrors.profession = "Profession is required"
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required"
    } else if (formData.bio.trim().length < 50) {
      newErrors.bio = "Bio must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onChange(formData)
      onNext()
    }
  }

  return (
    <div className="step-form">
      <div className="form-header">
        <h2>Basic Information</h2>
        <p>Tell us about yourself and what you do</p>
      </div>

      <div className="form-grid two-column">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="profession">Profession *</label>
          <input
            id="profession"
            type="text"
            placeholder="e.g., Web Developer, Graphic Designer"
            value={formData.profession}
            onChange={(e) => handleChange("profession", e.target.value)}
          />
          {errors.profession && <span className="error-text">{errors.profession}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            id="location"
            type="text"
            placeholder="e.g., New York, USA"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
          {errors.location && <span className="error-text">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Professional Bio *</label>
          <textarea
            id="bio"
            placeholder="Write a compelling bio that describes your skills, experience, and what makes you unique as a freelancer..."
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
          />
          <small className="char-count">{formData.bio.length}/500 characters</small>
          {errors.bio && <span className="error-text">{errors.bio}</span>}
        </div>
      </div>

      <div className="form-actions">
        <div></div>
        <button className="btn btn-primary" onClick={handleNext}>
          Next Step
        </button>
      </div>
    </div>
  )
}

export default BasicInformation
