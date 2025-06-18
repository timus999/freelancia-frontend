"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { jobAPI } from "../../api/job"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
    location: "",
    job_type: "",
    deadline: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const categories = [
    "webdesign",
    "webdevelopment",
    "mobileapp",
    "graphicdesign",
    "writing",
    "marketing",
    "dataentry",
    "translation",
    "other",
  ]

  const jobTypes = ["full-time", "part-time", "contract", "freelance"]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Convert skills string to array
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill)

      const jobData = {
        ...formData,
        skills: skillsArray,
        budget: Number.parseFloat(formData.budget),
      }

      const response = await jobAPI.createJob(jobData)

      // Redirect to job details or jobs list
      navigate("/jobs", {
        state: { message: "Job posted successfully!" },
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="e.g. Build a responsive website"
        />
      </div>

      <div>
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          disabled={loading}
          rows={6}
          placeholder="Describe your project in detail..."
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(value) => handleSelectChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="skills">Required Skills (comma-separated)</Label>
        <Input
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="e.g. React, Node.js, MongoDB"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budget">Budget ($)</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            step="0.01"
            value={formData.budget}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="0.00"
          />
        </div>

        <div>
          <Label htmlFor="job_type">Job Type</Label>
          <Select onValueChange={(value) => handleSelectChange("job_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
            placeholder="Remote, New York, etc."
          />
        </div>

        <div>
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Posting Job..." : "Post Job"}
      </Button>
    </form>
  )
}

export default JobForm
