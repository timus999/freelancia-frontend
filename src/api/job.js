import { apiClient } from "./client.js"

export const jobAPI = {
  // Create a new job (for clients)
  createJob: async (jobData) => {
    try {
      const response = await apiClient.post("/jobs", {
        title: jobData.title,
        description: jobData.description,
        skills: jobData.skills, // array of strings
        budget: Number.parseFloat(jobData.budget),
        location: jobData.location,
        job_type: jobData.job_type,
        deadline: jobData.deadline,
        category: jobData.category,
      })
      return response
    } catch (error) {
      throw new Error(error.message || "Failed to create job")
    }
  },

  // Get all jobs with optional category filter
  getJobs: async (filters = {}) => {
    try {
      const params = {}

      if (filters.category) {
        params.category = filters.category
      }
      if (filters.job_type) {
        params.job_type = filters.job_type
      }
      if (filters.location) {
        params.location = filters.location
      }
      if (filters.budget_min) {
        params.budget_min = filters.budget_min
      }
      if (filters.budget_max) {
        params.budget_max = filters.budget_max
      }

      return await apiClient.get("/jobs", params)
    } catch (error) {
      throw new Error(error.message || "Failed to fetch jobs")
    }
  },

  // Get jobs by category
  getJobsByCategory: async (category) => {
    try {
      return await apiClient.get("/jobs", { category })
    } catch (error) {
      throw new Error(error.message || "Failed to fetch jobs by category")
    }
  },

  // Get single job details
  getJobById: async (jobId) => {
    try {
      return await apiClient.get(`/jobs/${jobId}`)
    } catch (error) {
      throw new Error(error.message || "Failed to fetch job details")
    }
  },

  // Update job (for clients)
  updateJob: async (jobId, jobData) => {
    try {
      return await apiClient.put(`/jobs/${jobId}`, {
        title: jobData.title,
        description: jobData.description,
        skills: jobData.skills,
        budget: Number.parseFloat(jobData.budget),
        location: jobData.location,
        job_type: jobData.job_type,
        deadline: jobData.deadline,
        category: jobData.category,
      })
    } catch (error) {
      throw new Error(error.message || "Failed to update job")
    }
  },

  // Delete job (for clients)
  deleteJob: async (jobId) => {
    try {
      return await apiClient.delete(`/jobs/${jobId}`)
    } catch (error) {
      throw new Error(error.message || "Failed to delete job")
    }
  },
}
