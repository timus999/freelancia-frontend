// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { useToast } from "../../hooks/useToast"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Clock, DollarSign, Users, MapPin, Send, FileText, TrendingUp, AlertCircle, X } from "lucide-react"
// import "./Findjob.scss"

// export default function BrowseProjectsPage() {
//   const navigate = useNavigate()
//   const { showToast } = useToast()
//   const [projects, setProjects] = useState([])
//   const [filteredProjects, setFilteredProjects] = useState([])
//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     budget: "",
//     sortBy: "newest",
//   })
//   const [selectedProject, setSelectedProject] = useState(null)
//   const [proposalData, setProposalData] = useState({
//     coverLetter: "",
//     proposedBudget: "",
//     timeline: "",
//     milestones: "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [showBidModal, setShowBidModal] = useState(false)

//   // Load projects from localStorage and mock data
//   useEffect(() => {
//     const loadProjects = () => {
//       // Get posted jobs from localStorage
//       const postedJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]")

//       // Convert posted jobs to project format
//       const convertedProjects = postedJobs.map((job) => ({
//         id: job.id,
//         title: job.title,
//         description: job.description,
//         budget: {
//           min: Number.parseInt(job.budgetMin) || 1000,
//           max: Number.parseInt(job.budgetMax) || 5000,
//           type: job.budgetType || "fixed",
//         },
//         timeline: job.timeline || "2-4 weeks",
//         skillsRequired: job.skills || [],
//         category: job.category || "Web Development",
//         postedTime: new Date(job.postedDate).toLocaleDateString() || "1 day ago",
//         proposals: getProposalCount(job.id),
//         client: {
//           name: job.clientName || "Anonymous Client",
//           location: job.location || "Remote",
//           rating: 4.5 + Math.random() * 0.5,
//           jobsPosted: Math.floor(Math.random() * 20) + 1,
//         },
//         featured: Math.random() > 0.7,
//         clientId: job.clientId,
//       }))

//       // Add some mock projects for demonstration
//       const mockProjects = [
//         {
//           id: "mock-1",
//           title: "Build a Modern E-commerce Website",
//           description:
//             "Looking for an experienced web developer to build a modern, responsive e-commerce website using React and Node.js. The site should include user authentication, payment processing, inventory management, and admin dashboard.",
//           budget: { min: 2000, max: 5000, type: "fixed" },
//           timeline: "2-3 months",
//           skillsRequired: ["React", "Node.js", "MongoDB", "Stripe"],
//           category: "Web Development",
//           postedTime: "2 hours ago",
//           proposals: getProposalCount("mock-1"),
//           client: {
//             name: "TechCorp Inc.",
//             location: "Mustang",
//             rating: 4.8,
//             jobsPosted: 15,
//           },
//           featured: true,
//           clientId: "mock-client-1",
//         },
//         {
//           id: "mock-2",
//           title: "Mobile App UI/UX Design",
//           description:
//             "Need a talented UI/UX designer to create a modern, intuitive design for our fitness tracking mobile app. Looking for someone with experience in health/fitness apps and Material Design principles.",
//           budget: { min: 800, max: 1500, type: "fixed" },
//           timeline: "3-4 weeks",
//           skillsRequired: ["Figma", "UI Design", "UX Research", "Mobile Design"],
//           category: "Design",
//           postedTime: "5 hours ago",
//           proposals: getProposalCount("mock-2"),
//           client: {
//             name: "FitLife Startup",
//             location: "Pokhara",
//             rating: 4.6,
//             jobsPosted: 3,
//           },
//           featured: false,
//           clientId: "mock-client-2",
//         },
//       ]

//       const allProjects = [...convertedProjects, ...mockProjects]
//       setProjects(allProjects)
//       setFilteredProjects(allProjects)
//     }

//     loadProjects()
//   }, [])

//   // Get proposal count for a project
//   const getProposalCount = (projectId) => {
//     const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
//     return allProposals.filter((proposal) => proposal.jobId === projectId).length
//   }

//   // Apply filters
//   useEffect(() => {
//     let filtered = [...projects]

//     // Search filter
//     if (filters.search) {
//       filtered = filtered.filter(
//         (project) =>
//           project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//           project.description.toLowerCase().includes(filters.search.toLowerCase()) ||
//           project.skillsRequired.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase())),
//       )
//     }

//     // Category filter
//     if (filters.category && filters.category !== "all") {
//       filtered = filtered.filter((project) => project.category === filters.category)
//     }

//     // Budget filter
//     if (filters.budget && filters.budget !== "all") {
//       filtered = filtered.filter((project) => {
//         const maxBudget = project.budget.max
//         switch (filters.budget) {
//           case "0-500":
//             return maxBudget <= 500
//           case "500-1000":
//             return maxBudget > 500 && maxBudget <= 1000
//           case "1000-5000":
//             return maxBudget > 1000 && maxBudget <= 5000
//           case "5000+":
//             return maxBudget > 5000
//           default:
//             return true
//         }
//       })
//     }

//     // Sort
//     switch (filters.sortBy) {
//       case "budget-high":
//         filtered.sort((a, b) => b.budget.max - a.budget.max)
//         break
//       case "budget-low":
//         filtered.sort((a, b) => a.budget.max - b.budget.max)
//         break
//       case "proposals":
//         filtered.sort((a, b) => a.proposals - b.proposals)
//         break
//       default: // newest
//         filtered.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime))
//     }

//     setFilteredProjects(filtered)
//   }, [projects, filters])

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }))
//   }

//   const handleOpenProposal = (project) => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

//     if (!currentUser.id) {
//       showToast("Please login to submit a proposal", "error")
//       navigate("/login")
//       return
//     }

//     // Check if user already submitted a proposal for this project
//     const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
//     const existingProposal = allProposals.find(
//       (proposal) => proposal.jobId === project.id && proposal.freelancerId === currentUser.id,
//     )

//     if (existingProposal) {
//       showToast("You have already submitted a proposal for this project", "warning")
//       return
//     }

//     setSelectedProject(project)
//     setShowBidModal(true)
//   }

//   const handleSubmitProposal = async () => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

//     if (!currentUser.id) {
//       showToast("Please login to submit a proposal", "error")
//       navigate("/login")
//       return
//     }

//     if (!proposalData.coverLetter || !proposalData.proposedBudget || !proposalData.timeline) {
//       showToast("Please fill in all required fields", "error")
//       return
//     }

//     // Validate bid amount
//     const bidAmount = Number.parseFloat(proposalData.proposedBudget)
//     if (isNaN(bidAmount) || bidAmount <= 0) {
//       showToast("Please enter a valid bid amount", "error")
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       // Create proposal object
//       const proposal = {
//         id: Date.now().toString(),
//         jobId: selectedProject.id,
//         jobTitle: selectedProject.title,
//         freelancerId: currentUser.id,
//         freelancerName: `${currentUser.firstName || "Anonymous"} ${currentUser.lastName || "User"}`,
//         freelancerEmail: currentUser.email,
//         clientId: selectedProject.clientId,
//         coverLetter: proposalData.coverLetter,
//         proposedBudget: bidAmount,
//         timeline: proposalData.timeline,
//         milestones: proposalData.milestones,
//         status: "Pending",
//         submittedDate: new Date().toISOString(),
//         freelancerProfile: {
//           name: `${currentUser.firstName || "Anonymous"} ${currentUser.lastName || "User"}`,
//           avatar: currentUser.profilePicture || "",
//           rating: currentUser.rating || 4.5,
//           completedProjects: currentUser.completedProjects || 0,
//           hourlyRate: currentUser.hourlyRate || 50,
//           skills: currentUser.skills || [],
//         },
//       }

//       // Save to localStorage
//       const existingProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
//       existingProposals.push(proposal)
//       localStorage.setItem("proposals", JSON.stringify(existingProposals))

//       // Update project proposal count
//       const updatedProjects = projects.map((project) =>
//         project.id === selectedProject.id ? { ...project, proposals: project.proposals + 1 } : project,
//       )
//       setProjects(updatedProjects)

//       // Trigger storage event for real-time updates
//       window.dispatchEvent(new Event("storage"))

//       showToast("Proposal submitted successfully!", "success")

//       // Reset form and close modal
//       setProposalData({
//         coverLetter: "",
//         proposedBudget: "",
//         timeline: "",
//         milestones: "",
//       })
//       setSelectedProject(null)
//       setShowBidModal(false)
//     } catch (error) {
//       showToast("Failed to submit proposal. Please try again.", "error")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const getBidRecommendation = () => {
//     if (!selectedProject) return null

//     const { min, max } = selectedProject.budget
//     const competitive = Math.floor((min + max) / 2)
//     const aggressive = Math.floor(min + (max - min) * 0.3)

//     return {
//       competitive,
//       aggressive,
//       range: `$${min} - $${max}`,
//     }
//   }

//   const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
//   const hasSubmittedProposal = (projectId) => {
//     const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
//     return allProposals.some((proposal) => proposal.jobId === projectId && proposal.freelancerId === currentUser.id)
//   }

//   return (
//     <div className="find-job-page">
//       <div className="find-job-container">
//         {/* Header */}
//         <div className="find-job-header">
//           <h1 className="find-job-title">Browse Projects</h1>
//           <p className="find-job-subtitle">Find projects that match your skills and start earning</p>
//         </div>

//         {/* Filters */}
//         <div className="find-job-filters">
//           <div className="find-job-filter-grid">
//             <div className="filter-item">
//               <Input
//                 placeholder="Search projects..."
//                 className="find-job-search-input"
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange("search", e.target.value)}
//               />
//             </div>
//             <div className="filter-item">
//               <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
//                 <SelectTrigger className="find-job-select">
//                   <SelectValue placeholder="Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   <SelectItem value="Web Development">Web Development</SelectItem>
//                   <SelectItem value="Design">Design</SelectItem>
//                   <SelectItem value="Marketing">Marketing</SelectItem>
//                   <SelectItem value="Writing">Writing</SelectItem>
//                   <SelectItem value="Data Science">Data Science</SelectItem>
//                   <SelectItem value="Mobile Development">Mobile Development</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="filter-item">
//               <Select value={filters.budget} onValueChange={(value) => handleFilterChange("budget", value)}>
//                 <SelectTrigger className="find-job-select">
//                   <SelectValue placeholder="Budget" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Budgets</SelectItem>
//                   <SelectItem value="0-500">$0 - $500</SelectItem>
//                   <SelectItem value="500-1000">$500 - $1,000</SelectItem>
//                   <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
//                   <SelectItem value="5000+">$5,000+</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="filter-item">
//               <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
//                 <SelectTrigger className="find-job-select">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="newest">Newest First</SelectItem>
//                   <SelectItem value="budget-high">Highest Budget</SelectItem>
//                   <SelectItem value="budget-low">Lowest Budget</SelectItem>
//                   <SelectItem value="proposals">Fewest Proposals</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="find-job-results-summary">
//           <p className="find-job-results-count">{filteredProjects.length} projects found</p>
//         </div>

//         {/* Project Cards */}
//         <div className="find-job-project-cards">
//           {filteredProjects.map((project) => (
//             <Card
//               key={project.id}
//               className={`find-job-project-card ${project.featured ? "find-job-project-card-featured" : ""}`}
//             >
//               <CardContent className="find-job-card-content">
//                 {project.featured && <Badge className="find-job-featured-badge">Featured Project</Badge>}

//                 <div className="find-job-project-details-wrapper">
//                   <div className="find-job-project-main-info">
//                     <h3 className="find-job-project-title">{project.title}</h3>

//                     <div className="find-job-project-meta">
//                       <Badge className="find-job-category-badge">{project.category}</Badge>
//                       <div className="find-job-meta-item">
//                         <Clock className="find-job-icon" />
//                         <span>{project.postedTime}</span>
//                       </div>
//                       <div className="find-job-meta-item">
//                         <Users className="find-job-icon" />
//                         <span>{project.proposals} proposals</span>
//                       </div>
//                     </div>

//                     <p className="find-job-project-description">{project.description}</p>

//                     <div className="find-job-skills">
//                       {project.skillsRequired.map((skill, index) => (
//                         <Badge key={index} className="find-job-skill-badge">
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>

//                     <div className="find-job-project-attributes">
//                       <div className="find-job-attribute-item">
//                         <DollarSign className="find-job-icon" />
//                         <span>
//                           {project.budget.type === "fixed"
//                             ? `$${project.budget.min} - $${project.budget.max} Fixed`
//                             : `$${project.budget.min} - $${project.budget.max}/hr`}
//                         </span>
//                       </div>
//                       <div className="find-job-attribute-item">
//                         <Clock className="find-job-icon" />
//                         <span>{project.timeline}</span>
//                       </div>
//                       <div className="find-job-attribute-item">
//                         <MapPin className="find-job-icon" />
//                         <span>{project.client.location}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="find-job-client-actions">
//                     <div className="find-job-client-info">
//                       <h4 className="find-job-client-name">{project.client.name}</h4>
//                       <div className="find-job-client-meta">
//                         <div className="client-rating">★ {project.client.rating.toFixed(1)} rating</div>
//                         <div className="client-jobs">{project.client.jobsPosted} jobs posted</div>
//                       </div>
//                     </div>
//                     <div className="find-job-actions">
//                       {hasSubmittedProposal(project.id) ? (
//                         <button className="find-job-button-submitted" disabled>
//                           <AlertCircle className="find-job-icon" />
//                           <span>Proposal Submitted</span>
//                         </button>
//                       ) : (
//                         <button className="find-job-button-primary" onClick={() => handleOpenProposal(project)}>
//                           <TrendingUp className="find-job-icon" />
//                           <span>Place Bid</span>
//                         </button>
//                       )}
//                       <button className="find-job-button-secondary">
//                         <FileText className="find-job-icon" />
//                         <span>Save Project</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {filteredProjects.length === 0 && (
//           <div className="no-results">
//             <p>No projects found matching your criteria.</p>
//             <button
//               className="clear-filters-btn"
//               onClick={() => setFilters({ search: "", category: "", budget: "", sortBy: "newest" })}
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Bid Modal */}
//       {showBidModal && selectedProject && (
//         <div className="modal-overlay" onClick={() => setShowBidModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Submit Your Bid</h2>
//               <button className="close-button" onClick={() => setShowBidModal(false)}>
//                 <X />
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="project-summary">
//                 <h4>{selectedProject.title}</h4>
//                 <p className="budget">
//                   Client Budget: ${selectedProject.budget.min} - ${selectedProject.budget.max}
//                 </p>
//                 <p className="proposals-count">{selectedProject.proposals} freelancers bidding</p>
//               </div>

//               {/* Bidding Section */}
//               <div className="bidding-section">
//                 <Label className="form-label">Your Bid Amount ($) *</Label>
//                 <div className="bid-input-container">
//                   <Input
//                     type="number"
//                     placeholder="Enter your bid"
//                     value={proposalData.proposedBudget}
//                     onChange={(e) => setProposalData((prev) => ({ ...prev, proposedBudget: e.target.value }))}
//                     className="bid-input"
//                   />
//                   <div className="bid-recommendations">
//                     {getBidRecommendation() && (
//                       <>
//                         <p className="bid-range">Budget Range: {getBidRecommendation().range}</p>
//                         <div className="bid-suggestions">
//                           <button
//                             type="button"
//                             className="bid-suggestion-btn"
//                             onClick={() =>
//                               setProposalData((prev) => ({
//                                 ...prev,
//                                 proposedBudget: getBidRecommendation().aggressive.toString(),
//                               }))
//                             }
//                           >
//                             Competitive: ${getBidRecommendation().aggressive}
//                           </button>
//                           <button
//                             type="button"
//                             className="bid-suggestion-btn"
//                             onClick={() =>
//                               setProposalData((prev) => ({
//                                 ...prev,
//                                 proposedBudget: getBidRecommendation().competitive.toString(),
//                               }))
//                             }
//                           >
//                             Average: ${getBidRecommendation().competitive}
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <Label className="form-label">Timeline *</Label>
//                 <Input
//                   placeholder="e.g., 2 weeks"
//                   value={proposalData.timeline}
//                   onChange={(e) => setProposalData((prev) => ({ ...prev, timeline: e.target.value }))}
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <Label className="form-label">Cover Letter *</Label>
//                 <Textarea
//                   placeholder="Explain why you're the best fit for this project..."
//                   value={proposalData.coverLetter}
//                   onChange={(e) => setProposalData((prev) => ({ ...prev, coverLetter: e.target.value }))}
//                   rows={6}
//                   className="form-textarea"
//                 />
//               </div>

//               <div className="form-group">
//                 <Label className="form-label">Project Milestones (Optional)</Label>
//                 <Textarea
//                   placeholder="Break down your project milestones..."
//                   value={proposalData.milestones}
//                   onChange={(e) => setProposalData((prev) => ({ ...prev, milestones: e.target.value }))}
//                   rows={4}
//                   className="form-textarea"
//                 />
//               </div>

//               <div className="form-actions">
//                 <button onClick={handleSubmitProposal} disabled={isSubmitting} className="submit-proposal-btn">
//                   {isSubmitting ? (
//                     <>
//                       <div className="spinner" />
//                       <span>Submitting Bid...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Send className="icon" />
//                       <span>Submit Bid</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


//route correct
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { useJobs } from "../../hooks/useJobs"
import { useProposals } from "../../hooks/useProposals"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Clock, DollarSign, Users, MapPin, Send, FileText, TrendingUp, X } from "lucide-react"
import "./Findjob.scss"

export default function BrowseProjectsPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    skill: "",
    rate_min: "",
    rate_max: "",
    location: "",
    job_type: "",
  })

  const { jobs, loading, placeBid, saveJobForLater } = useJobs(filters)
  const { submitNewProposal } = useProposals()

  const [selectedProject, setSelectedProject] = useState(null)
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    bidAmount: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showBidModal, setShowBidModal] = useState(false)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleOpenProposal = (project) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

    if (!currentUser.id) {
      showToast("Please login to submit a proposal", "error")
      navigate("/login")
      return
    }

    setSelectedProject(project)
    setShowBidModal(true)
  }

  const handleSubmitProposal = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

    if (!currentUser.id) {
      showToast("Please login to submit a proposal", "error")
      navigate("/login")
      return
    }

    if (!proposalData.coverLetter || !proposalData.bidAmount) {
      showToast("Please fill in all required fields", "error")
      return
    }

    // Validate bid amount
    const bidAmount = Number.parseFloat(proposalData.bidAmount)
    if (isNaN(bidAmount) || bidAmount <= 0) {
      showToast("Please enter a valid bid amount", "error")
      return
    }

    setIsSubmitting(true)

    try {
      await submitNewProposal({
        jobId: selectedProject.id,
        coverLetter: proposalData.coverLetter,
        bidAmount: bidAmount,
      })

      // Reset form and close modal
      setProposalData({
        coverLetter: "",
        bidAmount: "",
        timeline: "",
      })
      setSelectedProject(null)
      setShowBidModal(false)
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveJob = async (jobId) => {
    try {
      await saveJobForLater(jobId)
    } catch (error) {
      // Error is handled in the hook
    }
  }

  const getBidRecommendation = () => {
    if (!selectedProject) return null

    const budget = selectedProject.budget || 0
    const competitive = Math.floor(budget * 0.8)
    const average = Math.floor(budget * 0.9)

    return {
      competitive,
      average,
      budget: budget,
    }
  }

  if (loading) {
    return (
      <div className="find-job-page">
        <div className="find-job-container">
          <div className="loading-state">Loading projects...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="find-job-page">
      <div className="find-job-container">
        {/* Header */}
        <div className="find-job-header">
          <h1 className="find-job-title">Browse Projects</h1>
          <p className="find-job-subtitle">Find projects that match your skills and start earning</p>
        </div>

        {/* Filters */}
        <div className="find-job-filters">
          <div className="find-job-filter-grid">
            <div className="filter-item">
              <Input
                placeholder="Search projects..."
                className="find-job-search-input"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div className="filter-item">
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="find-job-select">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="webdesign">Web Design</SelectItem>
                  <SelectItem value="webdevelopment">Web Development</SelectItem>
                  <SelectItem value="mobileapp">Mobile App</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="datascience">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="filter-item">
              <Input
                placeholder="Skill (e.g., React)"
                className="find-job-search-input"
                value={filters.skill}
                onChange={(e) => handleFilterChange("skill", e.target.value)}
              />
            </div>
            <div className="filter-item">
              <Select value={filters.job_type} onValueChange={(value) => handleFilterChange("job_type", value)}>
                <SelectTrigger className="find-job-select">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="find-job-results-summary">
          <p className="find-job-results-count">{jobs.length} projects found</p>
        </div>

        {/* Project Cards */}
        <div className="find-job-project-cards">
          {jobs.map((project) => (
            <Card key={project.id} className="find-job-project-card">
              <CardContent className="find-job-card-content">
                <div className="find-job-project-details-wrapper">
                  <div className="find-job-project-main-info">
                    <h3 className="find-job-project-title">{project.title}</h3>

                    <div className="find-job-project-meta">
                      <Badge className="find-job-category-badge">{project.category}</Badge>
                      <div className="find-job-meta-item">
                        <Clock className="find-job-icon" />
                        <span>{new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="find-job-meta-item">
                        <Users className="find-job-icon" />
                        <span>{project.proposal_count || 0} proposals</span>
                      </div>
                    </div>

                    <p className="find-job-project-description">{project.description}</p>

                    <div className="find-job-skills">
                      {project.skills &&
                        project.skills.map((skill, index) => (
                          <Badge key={index} className="find-job-skill-badge">
                            {skill}
                          </Badge>
                        ))}
                    </div>

                    <div className="find-job-project-attributes">
                      <div className="find-job-attribute-item">
                        <DollarSign className="find-job-icon" />
                        <span>
                          ${project.budget} {project.job_type}
                        </span>
                      </div>
                      <div className="find-job-attribute-item">
                        <Clock className="find-job-icon" />
                        <span>{new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="find-job-attribute-item">
                        <MapPin className="find-job-icon" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="find-job-client-actions">
                    <div className="find-job-client-info">
                      <h4 className="find-job-client-name">{project.client_name || "Client"}</h4>
                      <div className="find-job-client-meta">
                        <div className="client-rating">★ {project.client_rating || "5.0"} rating</div>
                        <div className="client-jobs">{project.client_jobs || "10"} jobs posted</div>
                      </div>
                    </div>
                    <div className="find-job-actions">
                      <button className="find-job-button-primary" onClick={() => handleOpenProposal(project)}>
                        <TrendingUp className="find-job-icon" />
                        <span>Place Bid</span>
                      </button>
                      <button className="find-job-button-secondary" onClick={() => handleSaveJob(project.id)}>
                        <FileText className="find-job-icon" />
                        <span>Save Project</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="no-results">
            <p>No projects found matching your criteria.</p>
            <button
              className="clear-filters-btn"
              onClick={() =>
                setFilters({
                  search: "",
                  category: "all",
                  skill: "",
                  rate_min: "",
                  rate_max: "",
                  location: "",
                  job_type: "all",
                })
              }
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Bid Modal */}
      {showBidModal && selectedProject && (
        <div className="modal-overlay" onClick={() => setShowBidModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Your Bid</h2>
              <button className="close-button" onClick={() => setShowBidModal(false)}>
                <X />
              </button>
            </div>
            <div className="modal-body">
              <div className="project-summary">
                <h4>{selectedProject.title}</h4>
                <p className="budget">Client Budget: ${selectedProject.budget}</p>
                <p className="proposals-count">{selectedProject.proposal_count || 0} freelancers bidding</p>
              </div>

              {/* Bidding Section */}
              <div className="bidding-section">
                <Label className="form-label">Your Bid Amount ($) *</Label>
                <div className="bid-input-container">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter your bid"
                    value={proposalData.bidAmount}
                    onChange={(e) => setProposalData((prev) => ({ ...prev, bidAmount: e.target.value }))}
                    className="bid-input"
                  />
                  <div className="bid-recommendations">
                    {getBidRecommendation() && (
                      <>
                        <p className="bid-range">Budget: ${getBidRecommendation().budget}</p>
                        <div className="bid-suggestions">
                          <button
                            type="button"
                            className="bid-suggestion-btn"
                            onClick={() =>
                              setProposalData((prev) => ({
                                ...prev,
                                bidAmount: getBidRecommendation().competitive.toString(),
                              }))
                            }
                          >
                            Competitive: ${getBidRecommendation().competitive}
                          </button>
                          <button
                            type="button"
                            className="bid-suggestion-btn"
                            onClick={() =>
                              setProposalData((prev) => ({
                                ...prev,
                                bidAmount: getBidRecommendation().average.toString(),
                              }))
                            }
                          >
                            Average: ${getBidRecommendation().average}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <Label className="form-label">Cover Letter *</Label>
                <Textarea
                  placeholder="Explain why you're the best fit for this project..."
                  value={proposalData.coverLetter}
                  onChange={(e) => setProposalData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                  rows={6}
                  className="form-textarea"
                />
              </div>

              <div className="form-actions">
                <button onClick={handleSubmitProposal} disabled={isSubmitting} className="submit-proposal-btn">
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      <span>Submitting Bid...</span>
                    </>
                  ) : (
                    <>
                      <Send className="icon" />
                      <span>Submit Bid</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
