"use client"

import { useState, useEffect } from "react"
import { jobAPI } from "../../api/job"
import JobCard from "./JobCard"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    job_type: "",
    location: "",
    budget_min: "",
    budget_max: "",
  })

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

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (appliedFilters = {}) => {
    setLoading(true)
    setError("")

    try {
      const response = await jobAPI.getJobs(appliedFilters)
      setJobs(Array.isArray(response) ? response : response.jobs || [])
    } catch (error) {
      setError(error.message)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value,
    }
    setFilters(newFilters)
  }

  const handleInputFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = {
      ...filters,
      [name]: value,
    }
    setFilters(newFilters)
  }

  const applyFilters = () => {
    // Remove empty filters
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        acc[key] = value
      }
      return acc
    }, {})

    fetchJobs(cleanFilters)
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      job_type: "",
      location: "",
      budget_min: "",
      budget_max: "",
    })
    fetchJobs()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <Select onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select onValueChange={(value) => handleFilterChange("job_type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input name="location" placeholder="Location" value={filters.location} onChange={handleInputFilterChange} />
          </div>

          <div>
            <Input
              name="budget_min"
              type="number"
              placeholder="Min Budget"
              value={filters.budget_min}
              onChange={handleInputFilterChange}
            />
          </div>

          <div>
            <Input
              name="budget_max"
              type="number"
              placeholder="Max Budget"
              value={filters.budget_max}
              onChange={handleInputFilterChange}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={applyFilters}>Apply Filters</Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  )
}

export default JobList
