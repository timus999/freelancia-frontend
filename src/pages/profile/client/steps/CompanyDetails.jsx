"use client"

import { useState } from "react"

function CompanyDetails({ data, onChange, onNext, onPrevious }) {
  const [formData, setFormData] = useState({
    companyName: data.companyName || "",
    companyWebsite: data.companyWebsite || "",
    companyDescription: data.companyDescription || "",
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

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }

    if (formData.companyWebsite && !isValidUrl(formData.companyWebsite)) {
      newErrors.companyWebsite = "Please enter a valid website URL"
    }

    if (!formData.companyDescription.trim()) {
      newErrors.companyDescription = "Company description is required"
    } else if (formData.companyDescription.trim().length < 50) {
      newErrors.companyDescription = "Description must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
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
        <h2>Company Details</h2>
        <p>Tell us about your company or organization</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            id="companyName"
            type="text"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />
          {errors.companyName && <span className="error-text">{errors.companyName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="companyWebsite">Company Website</label>
          <input
            id="companyWebsite"
            type="url"
            placeholder="https://www.yourcompany.com"
            value={formData.companyWebsite}
            onChange={(e) => handleChange("companyWebsite", e.target.value)}
          />
          {errors.companyWebsite && <span className="error-text">{errors.companyWebsite}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="companyDescription">Company Description *</label>
          <textarea
            id="companyDescription"
            placeholder="Describe your company, what you do, your industry, and what makes you unique..."
            value={formData.companyDescription}
            onChange={(e) => handleChange("companyDescription", e.target.value)}
          />
          <small className="char-count">{formData.companyDescription.length}/500 characters</small>
          {errors.companyDescription && <span className="error-text">{errors.companyDescription}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onPrevious}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next Step
        </button>
      </div>
    </div>
  )
}

export default CompanyDetails
