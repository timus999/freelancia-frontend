"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { useAuth } from "../../contexts/AuthContext"
import { getJobById, submitDelivery, approveDelivery, rejectDelivery, respondToDispute } from "../../api/job"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Upload, Download, CheckCircle, XCircle, FileText, AlertTriangle, MessageSquare, Paperclip } from "lucide-react"
import "./JobDelivery.scss"

export default function JobDelivery() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deliveryData, setDeliveryData] = useState({
    description: "",
    files: [],
    notes: "",
  })
  const [disputeData, setDisputeData] = useState({
    reason: "",
    evidence: "",
    files: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchJobDetails()
  }, [jobId])

  const fetchJobDetails = async () => {
    try {
      const jobData = await getJobById(jobId)
      setJob(jobData)
    } catch (error) {
      showToast("Failed to fetch job details", "error")
      navigate("/orders")
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e, type = "delivery") => {
    const files = Array.from(e.target.files)
    if (type === "delivery") {
      setDeliveryData((prev) => ({
        ...prev,
        files: [...prev.files, ...files],
      }))
    } else {
      setDisputeData((prev) => ({
        ...prev,
        files: [...prev.files, ...files],
      }))
    }
  }

  const removeFile = (index, type = "delivery") => {
    if (type === "delivery") {
      setDeliveryData((prev) => ({
        ...prev,
        files: prev.files.filter((_, i) => i !== index),
      }))
    } else {
      setDisputeData((prev) => ({
        ...prev,
        files: prev.files.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmitDelivery = async () => {
    if (!deliveryData.description.trim()) {
      showToast("Please provide a delivery description", "error")
      return
    }

    setIsSubmitting(true)
    try {
      // In a real app, you'd upload files to IPFS or cloud storage first
      const deliveryHash = "mock-ipfs-hash-" + Date.now()
      await submitDelivery(jobId, deliveryHash)
      showToast("Delivery submitted successfully!", "success")
      fetchJobDetails()
    } catch (error) {
      showToast("Failed to submit delivery", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApproveDelivery = async () => {
    setIsSubmitting(true)
    try {
      await approveDelivery(jobId)
      showToast("Delivery approved successfully!", "success")
      fetchJobDetails()
    } catch (error) {
      showToast("Failed to approve delivery", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRejectDelivery = async () => {
    if (!disputeData.reason.trim()) {
      showToast("Please provide a reason for rejection", "error")
      return
    }

    setIsSubmitting(true)
    try {
      const evidenceHash = "mock-evidence-hash-" + Date.now()
      await rejectDelivery(jobId, disputeData.reason, evidenceHash)
      showToast("Delivery rejected and dispute raised", "success")
      fetchJobDetails()
    } catch (error) {
      showToast("Failed to reject delivery", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRespondToDispute = async () => {
    if (!disputeData.evidence.trim()) {
      showToast("Please provide your response", "error")
      return
    }

    setIsSubmitting(true)
    try {
      const evidenceHash = "mock-response-hash-" + Date.now()
      await respondToDispute(jobId, evidenceHash)
      showToast("Dispute response submitted", "success")
      fetchJobDetails()
    } catch (error) {
      showToast("Failed to submit dispute response", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="job-delivery-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="job-delivery-page">
        <div className="error-state">
          <h2>Job not found</h2>
          <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
        </div>
      </div>
    )
  }

  const isFreelancer = user?.role === "freelancer"
  const isClient = user?.role === "client"
  const canSubmitDelivery = isFreelancer && job.status === "in_progress"
  const canReviewDelivery = isClient && job.status === "delivered"
  const hasDispute = job.status === "disputed"

  return (
    <div className="job-delivery-page">
      <div className="job-delivery-container">
        {/* Header */}
        <div className="delivery-header">
          <div className="header-content">
            <h1 className="delivery-title">Job Delivery</h1>
            <Badge
              variant={
                job.status === "completed"
                  ? "default"
                  : job.status === "disputed"
                    ? "destructive"
                    : job.status === "delivered"
                      ? "secondary"
                      : "outline"
              }
              className="status-badge"
            >
              {job.status?.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
          <Button variant="outline" onClick={() => navigate("/orders")}>
            Back to Orders
          </Button>
        </div>

        {/* Job Info */}
        <Card className="job-info-card">
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="job-details">
              <div className="detail-item">
                <span className="label">Budget:</span>
                <span className="value">${job.budget}</span>
              </div>
              <div className="detail-item">
                <span className="label">Deadline:</span>
                <span className="value">{new Date(job.deadline).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Client:</span>
                <span className="value">{job.client_name}</span>
              </div>
            </div>
            <p className="job-description">{job.description}</p>
          </CardContent>
        </Card>

        {/* Delivery Section */}
        {canSubmitDelivery && (
          <Card className="delivery-section">
            <CardHeader>
              <CardTitle>
                <Upload className="icon" />
                Submit Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="delivery-form">
                <div className="form-group">
                  <Label htmlFor="delivery-description">Delivery Description *</Label>
                  <Textarea
                    id="delivery-description"
                    placeholder="Describe what you've delivered and any important notes..."
                    value={deliveryData.description}
                    onChange={(e) => setDeliveryData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <Label>Delivery Files</Label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e, "delivery")}
                      style={{ display: "none" }}
                      id="delivery-files"
                    />
                    <label htmlFor="delivery-files" className="file-upload-label">
                      <Paperclip className="icon" />
                      <span>Choose Files</span>
                    </label>
                  </div>

                  {deliveryData.files.length > 0 && (
                    <div className="uploaded-files">
                      {deliveryData.files.map((file, index) => (
                        <div key={index} className="file-item">
                          <FileText className="icon" />
                          <span>{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index, "delivery")}
                            className="remove-btn"
                          >
                            <XCircle className="icon" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <Label htmlFor="delivery-notes">Additional Notes</Label>
                  <Textarea
                    id="delivery-notes"
                    placeholder="Any additional notes or instructions..."
                    value={deliveryData.notes}
                    onChange={(e) => setDeliveryData((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>

                <Button onClick={handleSubmitDelivery} disabled={isSubmitting} className="submit-delivery-btn">
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="icon" />
                      Submit Delivery
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Review Delivery Section */}
        {canReviewDelivery && (
          <Card className="review-section">
            <CardHeader>
              <CardTitle>
                <FileText className="icon" />
                Review Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="delivery-info">
                <h4>Freelancer's Delivery</h4>
                <p>{job.delivery_description || "No description provided"}</p>

                {job.delivery_files && job.delivery_files.length > 0 && (
                  <div className="delivery-files">
                    <h5>Delivered Files:</h5>
                    {job.delivery_files.map((file, index) => (
                      <div key={index} className="file-item">
                        <FileText className="icon" />
                        <span>{file.name}</span>
                        <Button variant="outline" size="sm">
                          <Download className="icon" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="review-actions">
                <Button onClick={handleApproveDelivery} disabled={isSubmitting} className="approve-btn">
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="icon" />
                      Approve Delivery
                    </>
                  )}
                </Button>

                <div className="reject-section">
                  <div className="form-group">
                    <Label htmlFor="reject-reason">Reason for Rejection</Label>
                    <Textarea
                      id="reject-reason"
                      placeholder="Explain why you're rejecting this delivery..."
                      value={disputeData.reason}
                      onChange={(e) => setDisputeData((prev) => ({ ...prev, reason: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleRejectDelivery}
                    disabled={isSubmitting}
                    variant="destructive"
                    className="reject-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <XCircle className="icon" />
                        Reject & Dispute
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dispute Section */}
        {hasDispute && (
          <Card className="dispute-section">
            <CardHeader>
              <CardTitle>
                <AlertTriangle className="icon" />
                Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="dispute-info">
                <div className="dispute-status">
                  <Badge variant="destructive">Dispute Active</Badge>
                  <p>This job is currently under dispute resolution.</p>
                </div>

                {job.dispute_reason && (
                  <div className="dispute-reason">
                    <h5>Dispute Reason:</h5>
                    <p>{job.dispute_reason}</p>
                  </div>
                )}
              </div>

              {isFreelancer && (
                <div className="dispute-response">
                  <div className="form-group">
                    <Label htmlFor="dispute-evidence">Your Response</Label>
                    <Textarea
                      id="dispute-evidence"
                      placeholder="Provide your response to the dispute..."
                      value={disputeData.evidence}
                      onChange={(e) => setDisputeData((prev) => ({ ...prev, evidence: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <Label>Supporting Evidence</Label>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e, "dispute")}
                        style={{ display: "none" }}
                        id="dispute-files"
                      />
                      <label htmlFor="dispute-files" className="file-upload-label">
                        <Paperclip className="icon" />
                        <span>Upload Evidence</span>
                      </label>
                    </div>
                  </div>

                  <Button onClick={handleRespondToDispute} disabled={isSubmitting} className="respond-btn">
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="icon" />
                        Submit Response
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Completed Section */}
        {job.status === "completed" && (
          <Card className="completed-section">
            <CardContent className="completed-content">
              <div className="success-icon">
                <CheckCircle className="icon" />
              </div>
              <h3>Job Completed Successfully!</h3>
              <p>This job has been completed and payment has been processed.</p>
              {isFreelancer && (
                <Button onClick={() => navigate("/orders")} className="view-earnings-btn">
                  View Earnings
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
