"use client"

import { useState, useEffect } from "react"
import { submitProposal, getMyProposals, getJobProposals, acceptProposal, rejectProposal } from "../api/proposal"
import { useToast } from "./useToast"

export const useProposals = () => {
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchMyProposals = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMyProposals()
      setProposals(data)
    } catch (err) {
      setError(err.message)
      showToast("Failed to fetch proposals", "error")
    } finally {
      setLoading(false)
    }
  }

  const submitNewProposal = async (proposalData) => {
    setLoading(true)
    try {
      const result = await submitProposal({
        jobId: proposalData.jobId,
        coverLetter: proposalData.coverLetter,
        bidAmount: proposalData.bidAmount,
      })
      showToast("Proposal submitted successfully!", "success")
      fetchMyProposals() // Refresh proposals
      return result
    } catch (err) {
      setError(err.message)
      showToast("Failed to submit proposal", "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    proposals,
    loading,
    error,
    fetchMyProposals,
    submitNewProposal,
    refetch: fetchMyProposals,
  }
}

export const useJobProposals = (jobId) => {
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchJobProposals = async () => {
    if (!jobId) return

    setLoading(true)
    setError(null)
    try {
      const data = await getJobProposals(jobId)
      setProposals(data)
    } catch (err) {
      setError(err.message)
      showToast("Failed to fetch job proposals", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptProposal = async (proposalId) => {
    setLoading(true)
    try {
      await acceptProposal(proposalId)
      showToast("Proposal accepted successfully!", "success")
      fetchJobProposals() // Refresh proposals
    } catch (err) {
      setError(err.message)
      showToast("Failed to accept proposal", "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleRejectProposal = async (proposalId) => {
    setLoading(true)
    try {
      await rejectProposal(proposalId)
      showToast("Proposal rejected", "success")
      fetchJobProposals() // Refresh proposals
    } catch (err) {
      setError(err.message)
      showToast("Failed to reject proposal", "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobProposals()
  }, [jobId])

  return {
    proposals,
    loading,
    error,
    fetchJobProposals,
    handleAcceptProposal,
    handleRejectProposal,
    refetch: fetchJobProposals,
  }
}
