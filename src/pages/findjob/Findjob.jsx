"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, DollarSign, MapPin, Filter } from "lucide-react"
import { jobAPI } from "../../api/job"
import { proposalAPI } from "../../api/proposal"
import "./Findjob.scss"

export default function BrowseProjectsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    budget_min: "",
    budget_max: "",
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true)
      const response = await jobAPI.getJobs(filterParams)
      setJobs(response.jobs || response)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setError("Failed to load jobs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const filterParams = {}
    if (filters.category) filterParams.category = filters.category
    if (filters.search) filterParams.search = filters.search
    if (filters.budget_min) filterParams.budget_min = filters.budget_min
    if (filters.budget_max) filterParams.budget_max = filters.budget_max

    fetchJobs(filterParams)
  }

  const handleSubmitProposal = async (jobId) => {
    try {
      // This would typically open a modal or navigate to a proposal form
      // For now, let's just show an alert
      const coverLetter = prompt("Enter your cover letter:")
      const bidAmount = prompt("Enter your bid amount:")

      if (coverLetter && bidAmount) {
        await proposalAPI.createProposal({
          job_id: jobId,
          cover_letter: coverLetter,
          bid_amount: Number.parseFloat(bidAmount),
        })
        alert("Proposal submitted successfully!")
      }
    } catch (error) {
      console.error("Error submitting proposal:", error)
      alert("Failed to submit proposal. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="find-job-page">
        <div className="find-job-container">
          <div className="loading-state">Loading jobs...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="find-job-page">
        <div className="find-job-container">
          <div className="error-state">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="find-job-page">
      <div className="find-job-container">
        {/* Header */}
        <div className="find-job-header">
          <h1 className="find-job-title">Browse Projects</h1>
          <p className="find-job-subtitle">Find projects that match your skills and start earning</p>
        </div>

        {/* Filters */}
        <div className="find-job-filters">
          <div className="find-job-filter-grid">
            <div>
              <Input
                placeholder="Search projects..."
                className="find-job-input"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div>
              <Select onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="find-job-select-trigger">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                placeholder="Min Budget"
                type="number"
                value={filters.budget_min}
                onChange={(e) => handleFilterChange("budget_min", e.target.value)}
              />
            </div>
            <div>
              <Button className="find-job-button-full" onClick={applyFilters}>
                <Filter className="find-job-icon" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="find-job-results-summary">
          <p className="find-job-results-count">{jobs.length} projects found</p>
        </div>

        {/* Project Cards */}
        <div className="find-job-project-cards">
          {jobs.map((job) => (
            <Card key={job.id} className="find-job-project-card">
              <CardContent className="find-job-card-content">
                <div className="find-job-project-details-wrapper">
                  <div className="find-job-project-main-info">
                    <h3 className="find-job-project-title">{job.title}</h3>

                    <div className="find-job-project-meta">
                      <Badge variant="outline" className="find-job-badge-outline">
                        {job.category}
                      </Badge>
                      <div className="find-job-meta-item">
                        <Clock className="find-job-icon" />
                        {job.deadline}
                      </div>
                    </div>

                    <p className="find-job-project-description">{job.description}</p>

                    <div className="find-job-skills">
                      {job.skills &&
                        job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="find-job-skill-badge">
                            {skill}
                          </Badge>
                        ))}
                    </div>

                    <div className="find-job-project-attributes">
                      <div className="find-job-attribute-item">
                        <DollarSign className="find-job-icon" />${job.budget}
                      </div>
                      <div className="find-job-attribute-item">
                        <MapPin className="find-job-icon" />
                        {job.location}
                      </div>
                    </div>
                  </div>

                  <div className="find-job-client-actions">
                    <div className="find-job-actions">
                      <Button className="find-job-button-full" onClick={() => handleSubmitProposal(job.id)}>
                        Submit Proposal
                      </Button>
                      <Button variant="outline" className="find-job-button-outline">
                        Save Project
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {jobs.length === 0 && !loading && (
          <div className="no-jobs-message">
            <p>No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
