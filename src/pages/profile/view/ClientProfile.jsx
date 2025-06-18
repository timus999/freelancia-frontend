"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../../../hooks/useToast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Mail,
  Globe,
  Star,
  Calendar,
  DollarSign,
  Briefcase,
  Building,
  Edit,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import "./ClientProfile.scss"

function ClientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [client, setClient] = useState(null)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [receivedProposals, setReceivedProposals] = useState([])

  // Load received proposals from localStorage
  const loadReceivedProposals = (userId) => {
    const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
    const userReceivedProposals = allProposals.filter((proposal) => proposal.clientId === userId)

    return userReceivedProposals.map((proposal) => ({
      id: proposal.id,
      jobId: proposal.jobId,
      jobTitle: proposal.jobTitle,
      freelancer: {
        name: proposal.freelancerName,
        avatar: proposal.freelancerProfile?.avatar || "",
        rating: proposal.freelancerProfile?.rating || 4.5,
        completedProjects: proposal.freelancerProfile?.completedProjects || 0,
        hourlyRate: proposal.freelancerProfile?.hourlyRate || 50,
      },
      proposedBudget: `$${proposal.proposedBudget}`,
      timeline: proposal.timeline,
      coverLetter: proposal.coverLetter,
      submittedDate: proposal.submittedDate,
      status: proposal.status,
      milestones: proposal.milestones,
      freelancerId: proposal.freelancerId,
    }))
  }

  // Mock data - replace with actual API call
  useEffect(() => {
    const loadClientData = () => {
      // Check if viewing own profile
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      const isOwn = !id || currentUser.id?.toString() === id

      setIsOwnProfile(isOwn)

      // Load real received proposals for own profile
      const userReceivedProposals = isOwn ? loadReceivedProposals(currentUser.id) : []
      setReceivedProposals(userReceivedProposals)

      // Load posted jobs from localStorage
      const allPostedJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]")
      const userPostedJobs = isOwn ? allPostedJobs.filter((job) => job.clientId === currentUser.id) : []

      // Mock client data
      const mockClient = {
        id: isOwn ? currentUser.id : id,
        firstName: isOwn ? currentUser.firstName || "Sarah" : "Sarah",
        lastName: isOwn ? currentUser.lastName || "Johnson" : "Johnson",
        profession: isOwn ? currentUser.profession || "Product Manager" : "Product Manager",
        location: isOwn ? currentUser.location || "New York, NY" : "New York, NY",
        position: isOwn ? currentUser.position || "Senior Product Manager" : "Senior Product Manager",
        profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",

        // Company details
        companyName: isOwn ? currentUser.companyName || "TechCorp Solutions" : "TechCorp Solutions",
        companyWebsite: isOwn
          ? currentUser.companyWebsite || "https://techcorp-solutions.com"
          : "https://techcorp-solutions.com",
        companyDescription: isOwn
          ? currentUser.companyDescription ||
            "Leading technology company specializing in innovative software solutions for enterprise clients."
          : "Leading technology company specializing in innovative software solutions for enterprise clients. We focus on digital transformation and cutting-edge technology implementations.",

        // Project preferences
        projectTypes: isOwn
          ? currentUser.projectTypes || ["Web Development", "Mobile App Development"]
          : ["Web Development", "Mobile App Development", "Design & Creative"],
        budgetRange: isOwn ? currentUser.budgetRange || "$5,000 - $10,000" : "$5,000 - $10,000",
        preferredCommunication: isOwn ? currentUser.preferredCommunication || "Slack" : "Slack",
        projectFrequency: isOwn ? currentUser.projectFrequency || "Monthly projects" : "Monthly projects",

        // Additional profile data
        joinDate: "2021-06-15",
        totalProjectsPosted: isOwn ? userPostedJobs.length : 24,
        completedProjects: isOwn ? userPostedJobs.filter((job) => job.status === "Completed").length : 18,
        averageRating: 4.7,
        totalSpent: "$125,000",

        // Use real posted jobs for own profile
        postedJobs: isOwn
          ? userPostedJobs.map((job) => ({
              id: job.id,
              title: job.title,
              description: job.description,
              budget: `$${job.budgetMin} - $${job.budgetMax}`,
              status: job.status || "Active",
              postedDate: job.postedDate,
              proposals: getProposalCount(job.id),
              category: job.category,
              skills: job.skills || [],
              deadline: job.deadline,
            }))
          : [
              {
                id: 1,
                title: "React Native Mobile App Development",
                description:
                  "Looking for an experienced React Native developer to build a cross-platform mobile application for our e-commerce platform.",
                budget: "$12,000 - $15,000",
                status: "Active",
                postedDate: "2024-01-20",
                proposals: 15,
                category: "Mobile Development",
                skills: ["React Native", "JavaScript", "API Integration"],
                deadline: "2024-03-15",
              },
            ],
      }

      setClient(mockClient)
      setLoading(false)
    }

    loadClientData()
  }, [id])

  // Get proposal count for a job
  const getProposalCount = (jobId) => {
    const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
    return allProposals.filter((proposal) => proposal.jobId === jobId).length
  }

  // Listen for storage changes to update proposals in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      if (isOwnProfile && currentUser.id) {
        const updatedProposals = loadReceivedProposals(currentUser.id)
        setReceivedProposals(updatedProposals)

        // Update posted jobs proposal counts
        const allPostedJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]")
        const userPostedJobs = allPostedJobs.filter((job) => job.clientId === currentUser.id)

        setClient((prev) => ({
          ...prev,
          postedJobs: userPostedJobs.map((job) => ({
            id: job.id,
            title: job.title,
            description: job.description,
            budget: `$${job.budgetMin} - $${job.budgetMax}`,
            status: job.status || "Active",
            postedDate: job.postedDate,
            proposals: getProposalCount(job.id),
            category: job.category,
            skills: job.skills || [],
            deadline: job.deadline,
          })),
          totalProjectsPosted: userPostedJobs.length,
        }))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [isOwnProfile])

  const handleEditProfile = () => {
    navigate("/edit-client-profile")
  }

  const handleMessage = () => {
    navigate("/messages")
  }

  const handleAcceptProposal = (proposalId) => {
    showToast("Proposal accepted!", "success")

    // Update proposal status in localStorage
    const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
    const updatedProposals = allProposals.map((proposal) =>
      proposal.id === proposalId ? { ...proposal, status: "Accepted" } : proposal,
    )
    localStorage.setItem("proposals", JSON.stringify(updatedProposals))

    // Update local state
    setReceivedProposals((prev) =>
      prev.map((proposal) => (proposal.id === proposalId ? { ...proposal, status: "Accepted" } : proposal)),
    )

    // Trigger storage event for real-time updates
    window.dispatchEvent(new Event("storage"))
  }

  const handleRejectProposal = (proposalId) => {
    showToast("Proposal rejected", "error")

    // Update proposal status in localStorage
    const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
    const updatedProposals = allProposals.map((proposal) =>
      proposal.id === proposalId ? { ...proposal, status: "Rejected" } : proposal,
    )
    localStorage.setItem("proposals", JSON.stringify(updatedProposals))

    // Update local state
    setReceivedProposals((prev) =>
      prev.map((proposal) => (proposal.id === proposalId ? { ...proposal, status: "Rejected" } : proposal)),
    )

    // Trigger storage event for real-time updates
    window.dispatchEvent(new Event("storage"))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="icon status-accepted" />
      case "Rejected":
        return <XCircle className="icon status-rejected" />
      case "Pending":
        return <AlertCircle className="icon status-pending" />
      default:
        return <Clock className="icon status-review" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Accepted":
        return "default"
      case "Rejected":
        return "destructive"
      case "Pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (loading) {
    return <div className="loading">Loading profile...</div>
  }

  if (!client) {
    return <div className="error">Profile not found</div>
  }

  return (
    <div className="client-profile">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="header-background"></div>
          <div className="header-content">
            <div className="profile-main">
              <Avatar className="profile-avatar">
                <AvatarImage
                  src={client.profilePicture || "/placeholder.svg"}
                  alt={`${client.firstName} ${client.lastName}`}
                />
                <AvatarFallback>
                  {client.firstName[0]}
                  {client.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="profile-info">
                <div className="name-section">
                  <h1>
                    {client.firstName} {client.lastName}
                  </h1>
                  <p className="profession">{client.profession}</p>
                  <p className="position">{client.position}</p>
                  <div className="location">
                    <MapPin className="icon" />
                    <span>{client.location}</span>
                  </div>
                </div>

                <div className="company-section">
                  <div className="company-info">
                    <Building className="icon" />
                    <div>
                      <h3>{client.companyName}</h3>
                      {client.companyWebsite && (
                        <a
                          href={client.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="website-link"
                        >
                          <Globe className="icon" />
                          Visit Website
                          <ExternalLink className="icon" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="stats-section">
                  <div className="stat">
                    <Briefcase className="icon" />
                    <span className="value">{client.totalProjectsPosted}</span>
                    <span className="label">projects posted</span>
                  </div>
                  <div className="stat">
                    <CheckCircle className="icon" />
                    <span className="value">{client.completedProjects}</span>
                    <span className="label">completed</span>
                  </div>
                  <div className="stat">
                    <Star className="icon" />
                    <span className="value">{client.averageRating}</span>
                    <span className="label">average rating</span>
                  </div>
                  <div className="stat">
                    <DollarSign className="icon" />
                    <span className="value">{client.totalSpent}</span>
                    <span className="label">total spent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              {isOwnProfile ? (
                <Button onClick={handleEditProfile} className="edit-btn">
                  <Edit className="icon" />
                  Edit Profile
                </Button>
              ) : (
                <div className="action-buttons">
                  <Button onClick={handleMessage} className="message-btn">
                    <MessageCircle className="icon" />
                    Message
                  </Button>
                  <Button variant="outline" className="contact-btn">
                    <Mail className="icon" />
                    Contact Me
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="profile-content">
          <Tabs defaultValue="overview" className="profile-tabs">
            <TabsList className="tabs-list">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
              {isOwnProfile && (
                <TabsTrigger value="proposals">
                  Received Proposals {receivedProposals.length > 0 && `(${receivedProposals.length})`}
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="tab-content">
              <div className="overview-grid">
                {/* Company Details */}
                <Card className="company-card">
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="company-header">
                      <h3>{client.companyName}</h3>
                      {client.companyWebsite && (
                        <a
                          href={client.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="website-button"
                        >
                          <Globe className="icon" />
                          Visit Website
                          <ExternalLink className="icon" />
                        </a>
                      )}
                    </div>
                    <p className="company-description">{client.companyDescription}</p>

                    <div className="details-grid">
                      <div className="detail-item">
                        <Calendar className="icon" />
                        <div>
                          <span className="label">Member since</span>
                          <span className="value">{new Date(client.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="detail-item">
                        <Users className="icon" />
                        <div>
                          <span className="label">Position</span>
                          <span className="value">{client.position}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Preferences */}
                <Card className="preferences-card">
                  <CardHeader>
                    <CardTitle>Project Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="preference-section">
                      <h4>Project Types</h4>
                      <div className="types-list">
                        {client.projectTypes.map((type, index) => (
                          <Badge key={index} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="preference-section">
                      <h4>Budget Range</h4>
                      <div className="budget-info">
                        <DollarSign className="icon" />
                        <span>{client.budgetRange}</span>
                      </div>
                    </div>

                    <div className="preference-section">
                      <h4>Communication</h4>
                      <div className="communication-info">
                        <MessageCircle className="icon" />
                        <span>{client.preferredCommunication}</span>
                      </div>
                    </div>

                    <div className="preference-section">
                      <h4>Project Frequency</h4>
                      <div className="frequency-info">
                        <Clock className="icon" />
                        <span>{client.projectFrequency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics */}
                <Card className="stats-card">
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-icon">
                          <Briefcase className="icon" />
                        </div>
                        <div className="stat-info">
                          <span className="value">{client.totalProjectsPosted}</span>
                          <span className="label">Total Projects</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon">
                          <CheckCircle className="icon" />
                        </div>
                        <div className="stat-info">
                          <span className="value">{client.completedProjects}</span>
                          <span className="label">Completed</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon">
                          <Star className="icon" />
                        </div>
                        <div className="stat-info">
                          <span className="value">{client.averageRating}</span>
                          <span className="label">Avg Rating</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon">
                          <TrendingUp className="icon" />
                        </div>
                        <div className="stat-info">
                          <span className="value">{client.totalSpent}</span>
                          <span className="label">Total Spent</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="tab-content">
              <Card>
                <CardHeader>
                  <CardTitle>Posted Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="jobs-list">
                    {client.postedJobs.map((job) => (
                      <div key={job.id} className="job-item">
                        <div className="job-header">
                          <div className="job-title-section">
                            <h3>{job.title}</h3>
                            <Badge
                              variant={
                                job.status === "Active"
                                  ? "default"
                                  : job.status === "Completed"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="status-badge"
                            >
                              {job.status}
                            </Badge>
                          </div>
                          <div className="job-meta">
                            <span className="budget">{job.budget}</span>
                            <span className="proposals">{job.proposals} proposals</span>
                          </div>
                        </div>

                        <p className="job-description">{job.description}</p>

                        <div className="job-details">
                          <div className="skills-section">
                            <span className="label">Skills:</span>
                            <div className="skills-list">
                              {job.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" size="sm">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="job-info">
                            <div className="info-item">
                              <Calendar className="icon" />
                              <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                            </div>
                            {job.deadline && (
                              <div className="info-item">
                                <Clock className="icon" />
                                <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {isOwnProfile && (
              <TabsContent value="proposals" className="tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Received Proposals ({receivedProposals.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {receivedProposals.length > 0 ? (
                      <div className="proposals-list">
                        {receivedProposals.map((proposal) => (
                          <div key={proposal.id} className="proposal-item">
                            <div className="proposal-header">
                              <div className="freelancer-info">
                                <Avatar className="freelancer-avatar">
                                  <AvatarImage
                                    src={proposal.freelancer.avatar || "/placeholder.svg"}
                                    alt={proposal.freelancer.name}
                                  />
                                  <AvatarFallback>{proposal.freelancer.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="freelancer-details">
                                  <h4>{proposal.freelancer.name}</h4>
                                  <div className="freelancer-stats">
                                    <div className="stat">
                                      <Star className="icon" />
                                      <span>{proposal.freelancer.rating}</span>
                                    </div>
                                    <div className="stat">
                                      <Briefcase className="icon" />
                                      <span>{proposal.freelancer.completedProjects} projects</span>
                                    </div>
                                    <div className="stat">
                                      <DollarSign className="icon" />
                                      <span>${proposal.freelancer.hourlyRate}/hr</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="proposal-status">
                                {getStatusIcon(proposal.status)}
                                <Badge variant={getStatusVariant(proposal.status)}>{proposal.status}</Badge>
                              </div>
                            </div>

                            <div className="proposal-content">
                              <h5>For: {proposal.jobTitle}</h5>
                              <p className="cover-letter">{proposal.coverLetter}</p>

                              <div className="proposal-details">
                                <div className="detail">
                                  <span className="label">Proposed Budget:</span>
                                  <span className="value">{proposal.proposedBudget}</span>
                                </div>
                                <div className="detail">
                                  <span className="label">Timeline:</span>
                                  <span className="value">{proposal.timeline}</span>
                                </div>
                                <div className="detail">
                                  <span className="label">Submitted:</span>
                                  <span className="value">{new Date(proposal.submittedDate).toLocaleDateString()}</span>
                                </div>
                              </div>

                              {proposal.milestones && (
                                <div className="milestones">
                                  <h5>Project Milestones:</h5>
                                  <p>{proposal.milestones}</p>
                                </div>
                              )}

                              {proposal.status === "Pending" && (
                                <div className="proposal-actions">
                                  <Button onClick={() => handleAcceptProposal(proposal.id)} className="accept-btn">
                                    <CheckCircle className="icon" />
                                    Accept Proposal
                                  </Button>
                                  <Button
                                    onClick={() => handleRejectProposal(proposal.id)}
                                    variant="outline"
                                    className="reject-btn"
                                  >
                                    <XCircle className="icon" />
                                    Reject Proposal
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-proposals">
                        <p>No proposals received yet.</p>
                        <Button onClick={() => navigate("/post-job")} className="post-job-btn">
                          Post a New Job
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile
