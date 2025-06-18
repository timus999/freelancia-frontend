"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { proposalAPI } from "../../api/proposal"
import { authAPI } from "../../api/auth"
import ProposalCard from "./ProposalCard"
import { Button } from "../ui/button"

const ProposalList = ({ type = "my" }) => {
  const { jobId } = useParams()
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    setUserRole(authAPI.getUserRole())
    fetchProposals()
  }, [type, jobId])

  const fetchProposals = async () => {
    setLoading(true)
    setError("")

    try {
      let response

      if (type === "my") {
        // Freelancer viewing their own proposals
        response = await proposalAPI.getMyProposals()
      } else if (type === "job" && jobId) {
        // Client viewing proposals for a specific job
        response = await proposalAPI.getJobProposals(jobId)
      } else {
        throw new Error("Invalid proposal list type")
      }

      setProposals(Array.isArray(response) ? response : response.proposals || [])
    } catch (error) {
      setError(error.message)
      setProposals([])
    } finally {
      setLoading(false)
    }
  }

  const handleProposalStatusUpdate = async (proposalId, status) => {
    try {
      await proposalAPI.updateProposalStatus(proposalId, status)
      // Refresh the proposals list
      fetchProposals()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleAcceptProposal = (proposalId) => {
    handleProposalStatusUpdate(proposalId, "accepted")
  }

  const handleRejectProposal = (proposalId) => {
    handleProposalStatusUpdate(proposalId, "rejected")
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{type === "my" ? "My Proposals" : "Job Proposals"}</h2>
        {type === "my" && (
          <Button onClick={fetchProposals} variant="outline">
            Refresh
          </Button>
        )}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="space-y-4">
        {proposals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {type === "my" ? "You haven't submitted any proposals yet." : "No proposals received for this job yet."}
            </p>
          </div>
        ) : (
          proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              showActions={type === "job" && userRole === "client"}
              onAccept={() => handleAcceptProposal(proposal.id)}
              onReject={() => handleRejectProposal(proposal.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ProposalList
