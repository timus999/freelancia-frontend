"use client"

import { useState } from "react"

function PortfolioRates({ data, onChange, onSubmit, onPrevious, loading }) {
  const [formData, setFormData] = useState({
    hourlyRate: data.hourlyRate || "",
    portfolioSamples: data.portfolioSamples || [],
    portfolioDescription: data.portfolioDescription || "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    // In a real app, you'd upload these files to a server
    // For now, we'll just store the file names
    const fileNames = files.map((file) => file.name)
    setFormData((prev) => ({
      ...prev,
      portfolioSamples: [...prev.portfolioSamples, ...fileNames],
    }))
  }

  const removePortfolioItem = (itemToRemove) => {
    const updatedSamples = formData.portfolioSamples.filter((item) => item !== itemToRemove)
    setFormData((prev) => ({ ...prev, portfolioSamples: updatedSamples }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.hourlyRate) {
      newErrors.hourlyRate = "Hourly rate is required"
    } else if (isNaN(formData.hourlyRate) || formData.hourlyRate <= 0) {
      newErrors.hourlyRate = "Please enter a valid hourly rate"
    }

    if (!formData.portfolioDescription.trim()) {
      newErrors.portfolioDescription = "Portfolio description is required"
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
        <h2>Portfolio & Rates</h2>
        <p>Set your rates and showcase your best work</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="hourlyRate">Hourly Rate (USD) *</label>
          <div className="rate-input-group">
            <span className="currency-symbol">$</span>
            <input
              id="hourlyRate"
              type="number"
              placeholder="25"
              min="1"
              step="0.01"
              value={formData.hourlyRate}
              onChange={(e) => handleChange("hourlyRate", e.target.value)}
            />
            <span className="rate-suffix">/hour</span>
          </div>
          {errors.hourlyRate && <span className="error-text">{errors.hourlyRate}</span>}
        </div>

        <div className="form-group">
          <label>Portfolio Samples</label>
          <div className="portfolio-upload">
            <div className="upload-icon">📁</div>
            <div className="upload-text">Upload your best work samples</div>
            <div className="upload-subtext">Supported formats: JPG, PNG, PDF, DOC (Max 10MB each)</div>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="portfolio-upload"
            />
            <label htmlFor="portfolio-upload" className="upload-btn">
              Choose Files
            </label>
          </div>

          {formData.portfolioSamples.length > 0 && (
            <div className="uploaded-files">
              <h4>Uploaded Files:</h4>
              <div className="file-list">
                {formData.portfolioSamples.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file}</span>
                    <button type="button" className="remove-btn" onClick={() => removePortfolioItem(file)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="portfolioDescription">Portfolio Description *</label>
          <textarea
            id="portfolioDescription"
            placeholder="Describe your portfolio, highlight your best projects, and explain what makes your work unique..."
            value={formData.portfolioDescription}
            onChange={(e) => handleChange("portfolioDescription", e.target.value)}
          />
          {errors.portfolioDescription && <span className="error-text">{errors.portfolioDescription}</span>}
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

export default PortfolioRates
