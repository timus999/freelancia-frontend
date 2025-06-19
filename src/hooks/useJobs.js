"use client"

import { useState, useEffect } from "react"
import { getJobs, getJobById, createJob, submitBid, saveJob } from "../api/job"
import { useToast } from "./useToast"

export const useJobs = (filters = {}) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getJobs(filters)
      setJobs(data)
    } catch (err) {
      setError(err.message)
      showToast("Failed to fetch jobs", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [JSON.stringify(filters)])

  const createNewJob = async (jobData) => {
    setLoading(true)
    try {
      const newJob = await createJob({
        title: jobData.title,
        description: jobData.description,
        skills: jobData.skills,
        budget: jobData.budget,
        location: jobData.location,
        job_type: jobData.jobType,
        deadline: jobData.deadline,
        category: jobData.category,
      })
      showToast("Job created successfully!", "success")
      fetchJobs() // Refresh the jobs list
      return newJob
    } catch (err) {
      setError(err.message)
      showToast("Failed to create job", "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const placeBid = async (jobId, bidData) => {
    setLoading(true)
    try {
      const result = await submitBid(jobId, {
        timeline: bidData.timeline,
        budget: Number.parseFloat(bidData.budget),
        message: bidData.coverLetter,
      })
      showToast("Bid submitted successfully!", "success")
      return result
    } catch (err) {
      setError(err.message)
      showToast("Failed to submit bid", "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const saveJobForLater = async (jobId) => {
    try {
      await saveJob(jobId)
      showToast("Job saved successfully!", "success")
    } catch (err) {
      showToast("Failed to save job", "error")
      throw err
    }
  }

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    createNewJob,
    placeBid,
    saveJobForLater,
    refetch: fetchJobs,
  }
}

export const useJob = (jobId) => {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchJob = async () => {
    if (!jobId) return

    setLoading(true)
    setError(null)
    try {
      const data = await getJobById(jobId)
      setJob(data)
    } catch (err) {
      setError(err.message)
      showToast("Failed to fetch job details", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJob()
  }, [jobId])

  return {
    job,
    loading,
    error,
    refetch: fetchJob,
  }
}
