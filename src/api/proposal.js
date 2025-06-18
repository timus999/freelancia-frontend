import { apiClient } from "./client.js"

export const proposalAPI = {
  // Submit a proposal (for freelancers)
  submitProposal: async (proposalData) => {
    try {
      const response = await apiClient.post("/proposals/", {
        job_id: Number.parseInt(proposalData.job_id),
        cover_letter: proposalData.cover_letter,
        bid_amount: Number.parseFloat(proposalData.bid_amount),
      })
      return response
    } catch (error) {
      throw new Error(error.message || "Failed to submit proposal")
    }
  },

  // Get proposals for a specific job (for clients)
  getJobProposals: async (jobId) => {
    try {
      return await apiClient.get(`/proposals/job/${jobId}`)
    } catch (error) {
      throw new Error(error.message || "Failed to fetch job proposals")
    }
  },

  // Get freelancer's own proposals
  getMyProposals: async () => {
    try {
      return await apiClient.get("/proposals/me")
    } catch (error) {
      throw new Error(error.message || "Failed to fetch your proposals")
    }
  },

  // Update proposal status (for clients)
  updateProposalStatus: async (proposalId, status) => {
    try {
      return await apiClient.patch(`/proposals/${proposalId}`, {
        status: status, // 'accepted', 'rejected', 'pending'
      })
    } catch (error) {
      throw new Error(error.message || "Failed to update proposal status")
    }
  },

  // Accept a proposal (for clients)
  acceptProposal: async (proposalId) => {
    try {
      return await proposalAPI.updateProposalStatus(proposalId, "accepted")
    } catch (error) {
      throw new Error(error.message || "Failed to accept proposal")
    }
  },

  // Reject a proposal (for clients)
  rejectProposal: async (proposalId) => {
    try {
      return await proposalAPI.updateProposalStatus(proposalId, "rejected")
    } catch (error) {
      throw new Error(error.message || "Failed to reject proposal")
    }
  },

  // Get single proposal details
  getProposalById: async (proposalId) => {
    try {
      return await apiClient.get(`/proposals/${proposalId}`)
    } catch (error) {
      throw new Error(error.message || "Failed to fetch proposal details")
    }
  },
}
