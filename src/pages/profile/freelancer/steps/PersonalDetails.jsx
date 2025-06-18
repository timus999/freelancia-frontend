"use client"

import { useState } from "react"

function PersonalDetails({ data, onChange, onNext, onPrevious }) {
  const [formData, setFormData] = useState({
    yearsOfExperience: data.yearsOfExperience || "",
    education: data.education || "",
    languages: data.languages || [],
  })

  const [newLanguage, setNewLanguage] = useState("")
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      const updatedLanguages = [...formData.languages, newLanguage.trim()]
      setFormData((prev) => ({ ...prev, languages: updatedLanguages }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (languageToRemove) => {
    const updatedLanguages = formData.languages.filter((lang) => lang !== languageToRemove)
    setFormData((prev) => ({ ...prev, languages: updatedLanguages }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of experience is required"
    }
    if (!formData.education.trim()) {
      newErrors.education = "Education is required"
    }
    if (formData.languages.length === 0) {
      newErrors.languages = "At least one language is required"
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
        <h2>Personal Details</h2>
        <p>Share your experience and background</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="experience">Years of Experience *</label>
          <select
            id="experience"
            value={formData.yearsOfExperience}
            onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
          >
            <option value="">Select experience level</option>
            <option value="0-1">0-1 years (Entry Level)</option>
            <option value="2-3">2-3 years</option>
            <option value="4-5">4-5 years</option>
            <option value="6-8">6-8 years</option>
            <option value="9-12">9-12 years</option>
            <option value="13+">13+ years (Expert)</option>
          </select>
          {errors.yearsOfExperience && <span className="error-text">{errors.yearsOfExperience}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="education">Education *</label>
          <textarea
            id="education"
            placeholder="Describe your educational background, degrees, certifications, etc."
            value={formData.education}
            onChange={(e) => handleChange("education", e.target.value)}
          />
          {errors.education && <span className="error-text">{errors.education}</span>}
        </div>

        <div className="form-group">
          <label>Languages *</label>
          <div className="skills-container">
            <div className="skills-input-group">
              <input
                type="text"
                placeholder="Add a language (e.g., English, Spanish)"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
              />
              <button type="button" className="add-btn" onClick={addLanguage}>
                Add
              </button>
            </div>
            {formData.languages.length > 0 && (
              <div className="skills-list">
                {formData.languages.map((language, index) => (
                  <div key={index} className="skill-tag">
                    {language}
                    <button type="button" className="remove-btn" onClick={() => removeLanguage(language)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.languages && <span className="error-text">{errors.languages}</span>}
          </div>
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

export default PersonalDetails
