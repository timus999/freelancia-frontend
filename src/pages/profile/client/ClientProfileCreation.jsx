"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../../hooks/useToast"
import BasicInformation from "./steps/BasicInformation"
import CompanyDetails from "./steps/CompanyDetails"
import ProjectPreferences from "./steps/ProjectPreferences"
import "./ClientProfileCreation.scss"

function ClientProfileCreation() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    profession: "",
    location: "",
    position: "",

    // Company Details
    companyName: "",
    companyWebsite: "",
    companyDescription: "",

    // Project Preferences
    projectTypes: [],
    budgetRange: "",
    preferredCommunication: "",
    projectFrequency: "",
  })

  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const totalSteps = 3

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormDataChange = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Here you would typically send the data to your backend
      console.log("Client Profile Data:", formData)

      // For demo purposes, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage for demo
      const tempUser = JSON.parse(localStorage.getItem("tempUser") || "{}")
      const completeUser = {
        ...tempUser,
        ...formData,
        profileComplete: true,
        username: `${formData.firstName}${formData.lastName}`.toLowerCase(),
      }

      localStorage.setItem("currentUser", JSON.stringify(completeUser))
      localStorage.removeItem("tempUser")

      showToast("Profile created successfully!", "success")
      navigate("/")
    } catch (error) {
      showToast("Failed to create profile. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformation data={formData} onChange={handleFormDataChange} onNext={handleNext} />
      case 2:
        return (
          <CompanyDetails
            data={formData}
            onChange={handleFormDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <ProjectPreferences
            data={formData}
            onChange={handleFormDataChange}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            loading={loading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="client-profile-creation">
      <div className="profile-container">
        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-header">
            <h1>Create Your Client Profile</h1>
            <p>
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
          <div className="step-indicators">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`step-indicator ${currentStep >= step ? "active" : ""}`}>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="form-section">{renderStep()}</div>
      </div>
    </div>
  )
}

export default ClientProfileCreation
