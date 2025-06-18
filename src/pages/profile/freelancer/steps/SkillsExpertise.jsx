import { useState } from "react"
function SkillsExpertise({ data, onChange, onNext, onPrevious }) {
  const [formData, setFormData] = useState({
    category: data.category || "",
    skills: data.skills || [],
    specializations: data.specializations || [],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newSpecialization, setNewSpecialization] = useState("")
  const [errors, setErrors] = useState({})

  const categories = [
    "Web Development",
    "Mobile Development",
    "Design & Creative",
    "Writing & Translation",
    "Digital Marketing",
    "Data Science & Analytics",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "Lifestyle",
  ]

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...formData.skills, newSkill.trim()]
      setFormData((prev) => ({ ...prev, skills: updatedSkills }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    const updatedSkills = formData.skills.filter((skill) => skill !== skillToRemove)
    setFormData((prev) => ({ ...prev, skills: updatedSkills }))
  }

  const addSpecialization = () => {
    if (newSpecialization.trim() && !formData.specializations.includes(newSpecialization.trim())) {
      const updatedSpecs = [...formData.specializations, newSpecialization.trim()]
      setFormData((prev) => ({ ...prev, specializations: updatedSpecs }))
      setNewSpecialization("")
    }
  }

  const removeSpecialization = (specToRemove) => {
    const updatedSpecs = formData.specializations.filter((spec) => spec !== specToRemove)
    setFormData((prev) => ({ ...prev, specializations: updatedSpecs }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.category) {
      newErrors.category = "Category is required"
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required"
    }
    if (formData.specializations.length === 0) {
      newErrors.specializations = "At least one specialization is required"
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
        <h2>Skills & Expertise</h2>
        <p>Showcase your skills and areas of specialization</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="category">Primary Category *</label>
          <select id="category" value={formData.category} onChange={(e) => handleChange("category", e.target.value)}>
            <option value="">Select your primary category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

      <div className="form-group">
          <label>Skills *</label>
          <div className="skills-container">
            <div className="skills-input-group">
              <input
                type="text"
                placeholder="Add a skill (e.g., React, Photoshop, SEO)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <button type="button" className="add-btn" onClick={addSkill}>
                Add
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="skills-list">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    {skill}
                    <button type="button" className="remove-btn" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.skills && <span className="error-text">{errors.skills}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Specializations *</label>
          <div className="skills-container">
            <div className="skills-input-group">
              <input
                type="text"
                placeholder="Add a specialization (e.g., E-commerce websites, Logo design)"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialization())}
              />
              <button type="button" className="add-btn" onClick={addSpecialization}>
                Add
              </button>
            </div>
            {formData.specializations.length > 0 && (
              <div className="skills-list">
                {formData.specializations.map((spec, index) => (
                  <div key={index} className="skill-tag">
                    {spec}
                    <button type="button" className="remove-btn" onClick={() => removeSpecialization(spec)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.specializations && <span className="error-text">{errors.specializations}</span>}
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

export default SkillsExpertise
