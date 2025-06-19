import client from "./client"

// Freelancer proposal routes
export const submitProposal = async (proposalData) => {
  const response = await client.post("/proposals", {
    job_id: proposalData.jobId,
    cover_letter: proposalData.coverLetter,
    bid_amount: Number.parseFloat(proposalData.bidAmount),
  })
  return response.data
}

export const getMyProposals = async () => {
  const response = await client.get("/proposals/me")
  return response.data
}

// Client proposal routes
export const getJobProposals = async (jobId) => {
  const response = await client.get(`/proposals/job/${jobId}`)
  return response.data
}

export const updateProposalStatus = async (proposalId, status) => {
  const response = await client.patch(`/proposals/${proposalId}`, {
    status: status,
  })
  return response.data
}

export const acceptProposal = async (proposalId) => {
  return updateProposalStatus(proposalId, "accepted")
}

export const rejectProposal = async (proposalId) => {
  return updateProposalStatus(proposalId, "rejected")
}
