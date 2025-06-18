"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { proposalAPI } from "../../api/proposal"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const ProposalForm = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    job_id: jobId || "",
    cover_letter: "",
    bid_amount: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await proposalAPI.submitProposal({
        job_id: Number.parseInt(formData.job_id),
        cover_letter: formData.cover_letter,
        bid_amount: Number.parseFloat(formData.bid_amount),
      })

      // Redirect to proposals list or job details
      navigate("/proposals/me", {
        state: { message: "Proposal submitted successfully!" },
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Submit Proposal</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div>
          <Label htmlFor="job_id">Job ID</Label>
          <Input
            id="job_id"
            name="job_id"
            type="number"
            value={formData.job_id}
            onChange={handleChange}
            required
            disabled={loading || !!jobId}
            placeholder="Enter job ID"
          />
        </div>

        <div>
          <Label htmlFor="bid_amount">Your Bid Amount ($)</Label>
          <Input
            id="bid_amount"
            name="bid_amount"
            type="number"
            step="0.01"
            value={formData.bid_amount}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="0.00"
          />
        </div>

        <div>
          <Label htmlFor="cover_letter">Cover Letter</Label>
          <Textarea
            id="cover_letter"
            name="cover_letter"
            value={formData.cover_letter}
            onChange={handleChange}
            required
            disabled={loading}
            rows={8}
            placeholder="Explain why you're the best fit for this job..."
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Submitting..." : "Submit Proposal"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProposalForm
