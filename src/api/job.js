import client from "./client"

// Client-specific job routes
export const createJob = async (data) => {
  const response = await client.post("/jobs", data)
  return response.data
}

export const getJobs = async (filters = {}) => {
  const queryParams = new URLSearchParams()

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      queryParams.append(key, filters[key])
    }
  })

  const response = await client.get(`/jobs?${queryParams.toString()}`)
  return response.data
}

export const getJobById = async (jobId) => {
  const response = await client.get(`/jobs/${jobId}`)
  return response.data
}

export const getJobProposals = async (jobId) => {
  const response = await client.get(`/proposals/job/${jobId}`)
  return response.data
}

export const inviteFreelancer = async (jobId, freelancerWallet) => {
  const response = await client.post(`/jobs/${jobId}/invite`, {
    job_id: jobId,
    freelancer_wallet: freelancerWallet,
  })
  return response.data
}

export const depositEscrow = async (jobId, amount) => {
  const response = await client.post(`/jobs/${jobId}/deposit`, {
    job_id: jobId,
    amount: amount,
  })
  return response.data
}

export const approveDelivery = async (jobId) => {
  const response = await client.post(`/jobs/${jobId}/delivery/approve`, {
    job_id: jobId,
  })
  return response.data
}

export const rejectDelivery = async (jobId, reason, evidenceHash) => {
  const response = await client.post(`/jobs/${jobId}/delivery/reject`, {
    job_id: jobId,
    reason: reason,
    evidence_ipfs_hash: evidenceHash,
  })
  return response.data
}

export const addJobTask = async (jobId, taskName) => {
  const response = await client.post(`/jobs/${jobId}/tasks`, {
    task_name: taskName,
  })
  return response.data
}

// Freelancer-specific job routes
export const submitBid = async (jobId, bidData) => {
  const response = await client.post(`/jobs/${jobId}/bid`, {
    job_id: jobId,
    timeline: bidData.timeline,
    budget: bidData.budget,
    message: bidData.message,
  })
  return response.data
}

export const saveJob = async (jobId) => {
  const response = await client.post(`/jobs/${jobId}/save`, {
    job_id: jobId,
  })
  return response.data
}

export const submitDelivery = async (jobId, deliveryHash) => {
  const response = await client.post(`/jobs/${jobId}/delivery`, {
    job_id: jobId,
    delivery_ipfs_hash: deliveryHash,
  })
  return response.data
}

export const respondToDispute = async (jobId, evidenceHash) => {
  const response = await client.post(`/jobs/${jobId}/dispute`, {
    job_id: jobId,
    evidence_ipfs_hash: evidenceHash,
  })
  return response.data
}

export const withdrawEarnings = async (jobId) => {
  const response = await client.post(`/jobs/${jobId}/withdraw`, {
    job_id: jobId,
  })
  return response.data
}

export const searchFreelancers = async (filters = {}) => {
  const queryParams = new URLSearchParams()

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      queryParams.append(key, filters[key])
    }
  })

  const response = await client.get(`/freelancers?${queryParams.toString()}`)
  return response.data
}
