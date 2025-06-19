"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { useAuth } from "../../contexts/AuthContext"
import { getJobById, depositEscrow, withdrawEarnings } from "../../api/job"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Download,
  Upload,
  CreditCard,
} from "lucide-react"
import "./EscrowManagement.scss"

export default function EscrowManagement() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [depositAmount, setDepositAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    fetchJobDetails()
  }, [jobId])

  const fetchJobDetails = async () => {
    try {
      const jobData = await getJobById(jobId)
      setJob(jobData)
      setDepositAmount(jobData.budget?.toString() || "")
    } catch (error) {
      showToast("Failed to fetch job details", "error")
      navigate("/orders")
    } finally {
      setLoading(false)
    }
  }

  const handleDepositEscrow = async () => {
    const amount = Number.parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) {
      showToast("Please enter a valid amount", "error")
      return
    }

    setIsProcessing(true)
    try {
      await depositEscrow(jobId, amount)
      showToast("Escrow deposited successfully!", "success")
      fetchJobDetails()
    } catch (error) {
      showToast("Failed to deposit escrow", "error")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleWithdrawEarnings = async () => {
    setIsProcessing(true)
    try {
      await withdrawEarnings(jobId)
      showToast("Earnings withdrawn successfully!", "success")
      fetchJobDetails()
    } catch (error) {
      showToast("Failed to withdraw earnings", "error")
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="escrow-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading escrow details...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="escrow-page">
        <div className="error-state">
          <h2>Job not found</h2>
          <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
        </div>
      </div>
    )
  }

  const isClient = user?.role === "client"
  const isFreelancer = user?.role === "freelancer"
  const escrowBalance = job.escrow_balance || 0
  const totalBudget = job.budget || 0
  const escrowProgress = totalBudget > 0 ? (escrowBalance / totalBudget) * 100 : 0

  return (
    <div className="escrow-page">
      <div className="escrow-container">
        {/* Header */}
        <div className="escrow-header">
          <div className="header-content">
            <h1 className="escrow-title">Escrow Management</h1>
            <Badge
              variant={job.status === "completed" ? "default" : job.status === "in_progress" ? "secondary" : "outline"}
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
                <span className="label">Total Budget:</span>
                <span className="value">${totalBudget}</span>
              </div>
              <div className="detail-item">
                <span className="label">Escrow Balance:</span>
                <span className="value">${escrowBalance}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className="value">{job.status?.replace("_", " ")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Escrow Overview */}
        <Card className="escrow-overview-card">
          <CardHeader>
            <CardTitle>
              <Shield className="icon" />
              Escrow Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="escrow-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <DollarSign className="icon" />
                </div>
                <div className="stat-info">
                  <h3>${escrowBalance}</h3>
                  <p>Current Escrow</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp className="icon" />
                </div>
                <div className="stat-info">
                  <h3>{escrowProgress.toFixed(1)}%</h3>
                  <p>Funded</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Clock className="icon" />
                </div>
                <div className="stat-info">
                  <h3>${totalBudget - escrowBalance}</h3>
                  <p>Remaining</p>
                </div>
              </div>
            </div>

            <div className="escrow-progress">
              <div className="progress-header">
                <span>Escrow Funding Progress</span>
                <span>{escrowProgress.toFixed(1)}%</span>
              </div>
              <Progress value={escrowProgress} className="progress-bar" />
            </div>

            <div className="escrow-info">
              <div className="info-item">
                <Shield className="icon" />
                <div>
                  <h4>Secure Payment</h4>
                  <p>Funds are held securely in escrow until work is completed and approved.</p>
                </div>
              </div>
              <div className="info-item">
                <CheckCircle className="icon" />
                <div>
                  <h4>Protected Transaction</h4>
                  <p>Both parties are protected with our dispute resolution system.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Actions */}
        {isClient && (
          <Card className="client-actions-card">
            <CardHeader>
              <CardTitle>
                <Upload className="icon" />
                Deposit Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="deposit-section">
                <div className="deposit-info">
                  <AlertTriangle className="icon" />
                  <p>
                    Deposit funds to escrow to secure this project. Funds will be released to the freelancer upon
                    successful completion.
                  </p>
                </div>

                <div className="deposit-form">
                  <div className="form-group">
                    <Label htmlFor="deposit-amount">Deposit Amount ($)</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      step="0.01"
                      placeholder="Enter amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>

                  <div className="payment-methods">
                    <h4>Payment Method</h4>
                    <div className="payment-options">
                      <div className="payment-option active">
                        <CreditCard className="icon" />
                        <span>Credit Card</span>
                      </div>
                      <div className="payment-option">
                        <DollarSign className="icon" />
                        <span>Bank Transfer</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleDepositEscrow}
                    disabled={isProcessing || !depositAmount}
                    className="deposit-btn"
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="icon" />
                        Deposit ${depositAmount || "0"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Freelancer Actions */}
        {isFreelancer && job.status === "completed" && escrowBalance > 0 && (
          <Card className="freelancer-actions-card">
            <CardHeader>
              <CardTitle>
                <Download className="icon" />
                Withdraw Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="withdraw-section">
                <div className="withdraw-info">
                  <CheckCircle className="icon" />
                  <p>Congratulations! Your work has been approved. You can now withdraw your earnings from escrow.</p>
                </div>

                <div className="earnings-summary">
                  <div className="earnings-item">
                    <span className="label">Project Earnings:</span>
                    <span className="value">${escrowBalance}</span>
                  </div>
                  <div className="earnings-item">
                    <span className="label">Platform Fee (3%):</span>
                    <span className="value">-${(escrowBalance * 0.03).toFixed(2)}</span>
                  </div>
                  <div className="earnings-item total">
                    <span className="label">Net Earnings:</span>
                    <span className="value">${(escrowBalance * 0.97).toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={handleWithdrawEarnings} disabled={isProcessing} className="withdraw-btn">
                  {isProcessing ? (
                    <>
                      <div className="spinner" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="icon" />
                      Withdraw Earnings
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction History */}
        <Card className="transaction-history-card">
          <CardHeader>
            <CardTitle>
              <Clock className="icon" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="transaction-list">
              {job.transactions?.length > 0 ? (
                job.transactions.map((transaction, index) => (
                  <div key={index} className="transaction-item">
                    <div className="transaction-icon">
                      {transaction.type === "deposit" ? (
                        <Upload className="icon deposit" />
                      ) : (
                        <Download className="icon withdraw" />
                      )}
                    </div>
                    <div className="transaction-details">
                      <h4>{transaction.type === "deposit" ? "Escrow Deposit" : "Earnings Withdrawal"}</h4>
                      <p>{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div className="transaction-amount">
                      <span className={transaction.type === "deposit" ? "positive" : "negative"}>
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-transactions">
                  <Clock className="icon" />
                  <p>No transactions yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
