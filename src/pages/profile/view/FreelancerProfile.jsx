// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useToast } from "../../../hooks/useToast"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import {
//   MapPin,
//   Star,
//   Calendar,
//   Briefcase,
//   GraduationCap,
//   Languages,
//   Edit,
//   MessageCircle,
//   Heart,
//   Share2,
//   Award,
//   Clock,
//   DollarSign,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react"
// import "./FreelancerProfile.scss"

// function FreelancerProfile() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const { showToast } = useToast()
//   const [freelancer, setFreelancer] = useState(null)
//   const [isOwnProfile, setIsOwnProfile] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [submittedProposals, setSubmittedProposals] = useState([])

//   // Load submitted proposals from localStorage
//   const loadSubmittedProposals = (userId) => {
//     const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
//     const userProposals = allProposals.filter((proposal) => proposal.freelancerId === userId)

//     return userProposals.map((proposal) => ({
//       id: proposal.id,
//       jobTitle: proposal.jobTitle,
//       client: proposal.clientId || "Anonymous Client",
//       proposedBudget: `$${proposal.proposedBudget}`,
//       status: proposal.status,
//       submittedDate: proposal.submittedDate,
//       description: proposal.coverLetter.substring(0, 100) + "...",
//       timeline: proposal.timeline,
//       milestones: proposal.milestones,
//       jobId: proposal.jobId,
//     }))
//   }

//   // Mock data - replace with actual API call
//   useEffect(() => {
//     const loadFreelancerData = () => {
//       // Check if viewing own profile
//       const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
//       const isOwn = !id || currentUser.id?.toString() === id

//       setIsOwnProfile(isOwn)

//       // Load real submitted proposals for own profile
//       const userSubmittedProposals = isOwn ? loadSubmittedProposals(currentUser.id) : []
//       setSubmittedProposals(userSubmittedProposals)

//       // Mock freelancer data
//       const mockFreelancer = {
//         id: isOwn ? currentUser.id : id,
//         firstName: isOwn ? currentUser.firstName || "Abin" : "Abin",
//         lastName: isOwn ? currentUser.lastName || "Gahatraj" : "Gahatraj",
//         profession: isOwn ? currentUser.profession || "Graphics & UI/UX Designer" : "Graphics & UI/Ux Designer",
//         location: isOwn ? currentUser.location || "Palpa, Tansen" : "Palpa, Tansen",
//         bio: isOwn
//           ? currentUser.bio ||
//             "Passionate Graphics and UI/UX designer with 8+ years of experience in Graphics Designing and 3+ years in UI/UX."
//           : "Passionate Graphics and UI/UX designer with 8+ years of experience in Graphics Designing and 3+ years in UI/UX.I specialize in Illustrator, Photoshop, Adobe XD.",
//         profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
//         hourlyRate: isOwn ? currentUser.hourlyRate || 75 : 75,
//         rating: 4.9,
//         totalReviews: 127,
//         completedProjects: 89,
//         responseTime: "2 hours",
//         availability: "Available",
//         joinDate: "2020-03-15",

//         // Profile creation data
//         yearsOfExperience: isOwn ? currentUser.yearsOfExperience || "4-5" : "4-5",
//         education: isOwn
//           ? currentUser.education ||
//             "Bachelor's in Computer Science from Stanford University. Certified AWS Solutions Architect."
//           : "Bachelor's in Computer Science from Stanford University. Certified AWS Solutions Architect.",
//         languages: isOwn ? currentUser.languages || ["English", "Spanish"] : ["English", "Spanish", "French"],
//         category: isOwn ? currentUser.category || "Web Development" : "Web Development",
//         skills: isOwn
//           ? currentUser.skills || ["React", "Node.js", "Python"]
//           : ["React", "Node.js", "Python", "AWS", "MongoDB", "TypeScript"],
//         specializations: isOwn
//           ? currentUser.specializations || ["E-commerce platforms", "SaaS applications"]
//           : ["E-commerce platforms", "SaaS applications", "API development"],
//         portfolioDescription: isOwn
//           ? currentUser.portfolioDescription ||
//             "My portfolio showcases a diverse range of projects from e-commerce platforms to complex SaaS applications."
//           : "My portfolio showcases a diverse range of projects from e-commerce platforms to complex SaaS applications.",

//         // Additional profile data
//         certifications: [
//           "AWS Certified Solutions Architect",
//           "Google Cloud Professional",
//           "React Developer Certification",
//         ],

//         recentProjects: [
//           {
//             id: 1,
//             title: "E-commerce Platform Redesign",
//             client: "TechCorp Inc.",
//             budget: "$5,000",
//             status: "Completed",
//             rating: 5,
//             completedDate: "2024-01-15",
//             image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
//           },
//           {
//             id: 2,
//             title: "Mobile App Development",
//             client: "StartupXYZ",
//             budget: "$8,500",
//             status: "In Progress",
//             completedDate: null,
//             image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
//           },
//           {
//             id: 3,
//             title: "API Integration Project",
//             client: "DataFlow Solutions",
//             budget: "$3,200",
//             status: "Completed",
//             rating: 4.8,
//             completedDate: "2023-12-20",
//             image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&h=200&fit=crop",
//           },
//         ],

//         acceptedProposals: [
//           {
//             id: 1,
//             jobTitle: "SaaS Dashboard Development",
//             client: "CloudTech Solutions",
//             budget: "$15,000",
//             status: "In Progress",
//             startDate: "2024-01-10",
//             deadline: "2024-03-15",
//             progress: 65,
//           },
//           {
//             id: 2,
//             jobTitle: "API Documentation Portal",
//             client: "DevTools Inc.",
//             budget: "$6,500",
//             status: "Completed",
//             startDate: "2023-11-01",
//             completedDate: "2023-12-15",
//             progress: 100,
//           },
//         ],

//         reviews: [
//           {
//             id: 1,
//             client: "Sarah Johnson",
//             rating: 5,
//             comment:
//               "Exceptional work! John delivered exactly what we needed and more. Great communication throughout the project.",
//             project: "E-commerce Platform",
//             date: "2024-01-15",
//           },
//           {
//             id: 2,
//             client: "Mike Chen",
//             rating: 4.8,
//             comment: "Very professional and skilled developer. Would definitely work with again.",
//             project: "API Integration",
//             date: "2023-12-20",
//           },
//         ],
//       }

//       setFreelancer(mockFreelancer)
//       setLoading(false)
//     }

//     loadFreelancerData()
//   }, [id])

//   // Listen for storage changes to update proposals in real-time
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
//       if (isOwnProfile && currentUser.id) {
//         const updatedProposals = loadSubmittedProposals(currentUser.id)
//         setSubmittedProposals(updatedProposals)
//       }
//     }

//     window.addEventListener("storage", handleStorageChange)
//     return () => window.removeEventListener("storage", handleStorageChange)
//   }, [isOwnProfile])

//   const handleEditProfile = () => {
//     navigate("/edit-freelancer-profile")
//   }

//   const handleHireMe = () => {
//     showToast("Hire request sent!", "success")
//   }

//   const handleMessage = () => {
//     navigate("/messages")
//   }

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Accepted":
//         return <CheckCircle className="icon status-accepted" />
//       case "Rejected":
//         return <XCircle className="icon status-rejected" />
//       case "Pending":
//         return <AlertCircle className="icon status-pending" />
//       default:
//         return <Clock className="icon status-review" />
//     }
//   }

//   const getStatusVariant = (status) => {
//     switch (status) {
//       case "Accepted":
//         return "default"
//       case "Rejected":
//         return "destructive"
//       case "Pending":
//         return "secondary"
//       default:
//         return "outline"
//     }
//   }

//   if (loading) {
//     return <div className="loading">Loading profile...</div>
//   }

//   if (!freelancer) {
//     return <div className="error">Profile not found</div>
//   }

//   return (
//     <div className="freelancer-profile">
//       <div className="profile-container">
//         {/* Header Section */}
//         <div className="profile-header">
//           <div className="header-background"></div>
//           <div className="header-content">
//             <div className="profile-main">
//               <Avatar className="profile-avatar">
//                 <AvatarImage
//                   src={freelancer.profilePicture || "/placeholder.svg"}
//                   alt={`${freelancer.firstName} ${freelancer.lastName}`}
//                 />
//                 <AvatarFallback>
//                   {freelancer.firstName[0]}
//                   {freelancer.lastName[0]}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="profile-info">
//                 <div className="name-section">
//                   <h1>
//                     {freelancer.firstName} {freelancer.lastName}
//                   </h1>
//                   <p className="profession">{freelancer.profession}</p>
//                   <div className="location">
//                     <MapPin className="icon" />
//                     <span>{freelancer.location}</span>
//                   </div>
//                 </div>

//                 <div className="stats-section">
//                   <div className="stat">
//                     <Star className="icon" />
//                     <span className="value">{freelancer.rating}</span>
//                     <span className="label">({freelancer.totalReviews} reviews)</span>
//                   </div>
//                   <div className="stat">
//                     <Briefcase className="icon" />
//                     <span className="value">{freelancer.completedProjects}</span>
//                     <span className="label">projects completed</span>
//                   </div>
//                   <div className="stat">
//                     <Clock className="icon" />
//                     <span className="value">{freelancer.responseTime}</span>
//                     <span className="label">response time</span>
//                   </div>
//                 </div>

//                 <div className="availability">
//                   <Badge variant="secondary" className="status-badge available">
//                     {freelancer.availability}
//                   </Badge>
//                   <span className="rate">${freelancer.hourlyRate}/hour</span>
//                 </div>
//               </div>
//             </div>

//             <div className="profile-actions">
//               {isOwnProfile ? (
//                 <Button onClick={handleEditProfile} className="edit-btn">
//                   <Edit className="icon" />
//                   Edit Profile
//                 </Button>
//               ) : (
//                 <div className="action-buttons">
//                   <Button onClick={handleHireMe} className="hire-btn">
//                     <Briefcase className="icon" />
//                     Hire Me
//                   </Button>
//                   <Button onClick={handleMessage} variant="outline" className="message-btn">
//                     <MessageCircle className="icon" />
//                     Message
//                   </Button>
//                   <Button variant="outline" size="icon" className="favorite-btn">
//                     <Heart className="icon" />
//                   </Button>
//                   <Button variant="outline" size="icon" className="share-btn">
//                     <Share2 className="icon" />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="profile-content">
//           <Tabs defaultValue="overview" className="profile-tabs">
//             <TabsList className="tabs-list">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
//               <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               {isOwnProfile && (
//                 <>
//                   <TabsTrigger value="proposals">
//                     Proposals {submittedProposals.length > 0 && `(${submittedProposals.length})`}
//                   </TabsTrigger>
//                   <TabsTrigger value="projects">My Projects</TabsTrigger>
//                 </>
//               )}
//             </TabsList>

//             <TabsContent value="overview" className="tab-content">
//               <div className="overview-grid">
//                 {/* About Section */}
//                 <Card className="about-card">
//                   <CardHeader>
//                     <CardTitle>About</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="bio">{freelancer.bio}</p>

//                     <div className="details-grid">
//                       <div className="detail-item">
//                         <Calendar className="icon" />
//                         <div>
//                           <span className="label">Member since</span>
//                           <span className="value">{new Date(freelancer.joinDate).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                       <div className="detail-item">
//                         <Briefcase className="icon" />
//                         <div>
//                           <span className="label">Experience</span>
//                           <span className="value">{freelancer.yearsOfExperience} years</span>
//                         </div>
//                       </div>
//                       <div className="detail-item">
//                         <GraduationCap className="icon" />
//                         <div>
//                           <span className="label">Education</span>
//                           <span className="value">{freelancer.education}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Skills Section */}
//                 <Card className="skills-card">
//                   <CardHeader>
//                     <CardTitle>Skills & Expertise</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="category-badge">
//                       <Badge variant="outline">{freelancer.category}</Badge>
//                     </div>

//                     <div className="skills-section">
//                       <h4>Technical Skills</h4>
//                       <div className="skills-list">
//                         {freelancer.skills.map((skill, index) => (
//                           <Badge key={index} variant="secondary">
//                             {skill}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="skills-section">
//                       <h4>Specializations</h4>
//                       <div className="skills-list">
//                         {freelancer.specializations.map((spec, index) => (
//                           <Badge key={index} variant="outline">
//                             {spec}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="skills-section">
//                       <h4>Languages</h4>
//                       <div className="languages-list">
//                         {freelancer.languages.map((language, index) => (
//                           <div key={index} className="language-item">
//                             <Languages className="icon" />
//                             <span>{language}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Certifications */}
//                 <Card className="certifications-card">
//                   <CardHeader>
//                     <CardTitle>Certifications</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="certifications-list">
//                       {freelancer.certifications.map((cert, index) => (
//                         <div key={index} className="certification-item">
//                           <Award className="icon" />
//                           <span>{cert}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="portfolio" className="tab-content">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Portfolio</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="portfolio-description">{freelancer.portfolioDescription}</p>

//                   <div className="recent-projects">
//                     <h3>Recent Projects</h3>
//                     <div className="projects-grid">
//                       {freelancer.recentProjects.map((project) => (
//                         <div key={project.id} className="project-card">
//                           <img
//                             src={project.image || "/placeholder.svg"}
//                             alt={project.title}
//                             className="project-image"
//                           />
//                           <div className="project-info">
//                             <h4>{project.title}</h4>
//                             <p className="client">Client: {project.client}</p>
//                             <div className="project-meta">
//                               <span className="budget">{project.budget}</span>
//                               <Badge
//                                 variant={project.status === "Completed" ? "default" : "secondary"}
//                                 className="status"
//                               >
//                                 {project.status}
//                               </Badge>
//                             </div>
//                             {project.rating && (
//                               <div className="project-rating">
//                                 <Star className="icon" />
//                                 <span>{project.rating}</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="reviews" className="tab-content">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Client Reviews</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="reviews-summary">
//                     <div className="rating-overview">
//                       <div className="rating-score">
//                         <span className="score">{freelancer.rating}</span>
//                         <div className="stars">
//                           {[...Array(5)].map((_, i) => (
//                             <Star key={i} className={`star ${i < Math.floor(freelancer.rating) ? "filled" : ""}`} />
//                           ))}
//                         </div>
//                         <span className="total">({freelancer.totalReviews} reviews)</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="reviews-list">
//                     {freelancer.reviews.map((review) => (
//                       <div key={review.id} className="review-item">
//                         <div className="review-header">
//                           <div className="client-info">
//                             <Avatar className="client-avatar">
//                               <AvatarFallback>{review.client[0]}</AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <h4>{review.client}</h4>
//                               <p className="project-name">{review.project}</p>
//                             </div>
//                           </div>
//                           <div className="review-rating">
//                             <div className="stars">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star key={i} className={`star ${i < Math.floor(review.rating) ? "filled" : ""}`} />
//                               ))}
//                             </div>
//                             <span className="date">{new Date(review.date).toLocaleDateString()}</span>
//                           </div>
//                         </div>
//                         <p className="review-comment">{review.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {isOwnProfile && (
//               <>
//                 <TabsContent value="proposals" className="tab-content">
//                   <div className="proposals-section">
//                     <Card className="submitted-proposals">
//                       <CardHeader>
//                         <CardTitle>Submitted Proposals ({submittedProposals.length})</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         {submittedProposals.length > 0 ? (
//                           <div className="proposals-list">
//                             {submittedProposals.map((proposal) => (
//                               <div key={proposal.id} className="proposal-item">
//                                 <div className="proposal-header">
//                                   <div className="proposal-title-section">
//                                     <h4>{proposal.jobTitle}</h4>
//                                     {getStatusIcon(proposal.status)}
//                                   </div>
//                                   <Badge variant={getStatusVariant(proposal.status)} className="status-badge">
//                                     {proposal.status}
//                                   </Badge>
//                                 </div>
//                                 <p className="client">Client: {proposal.client}</p>
//                                 <p className="description">{proposal.description}</p>
//                                 <div className="proposal-meta">
//                                   <div className="meta-item">
//                                     <DollarSign className="icon" />
//                                     <span>Bid: {proposal.proposedBudget}</span>
//                                   </div>
//                                   <div className="meta-item">
//                                     <Clock className="icon" />
//                                     <span>Timeline: {proposal.timeline}</span>
//                                   </div>
//                                   <div className="meta-item">
//                                     <Calendar className="icon" />
//                                     <span>Submitted: {new Date(proposal.submittedDate).toLocaleDateString()}</span>
//                                   </div>
//                                 </div>
//                                 {proposal.milestones && (
//                                   <div className="milestones">
//                                     <h5>Milestones:</h5>
//                                     <p>{proposal.milestones}</p>
//                                   </div>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="no-proposals">
//                             <p>You haven't submitted any proposals yet.</p>
//                             <Button onClick={() => navigate("/find-job")} className="browse-jobs-btn">
//                               Browse Projects
//                             </Button>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>

//                     <Card className="accepted-proposals">
//                       <CardHeader>
//                         <CardTitle>Accepted Proposals</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="proposals-list">
//                           {freelancer.acceptedProposals.map((proposal) => (
//                             <div key={proposal.id} className="proposal-item">
//                               <div className="proposal-header">
//                                 <h4>{proposal.jobTitle}</h4>
//                                 <Badge variant={proposal.status === "Completed" ? "default" : "secondary"}>
//                                   {proposal.status}
//                                 </Badge>
//                               </div>
//                               <p className="client">Client: {proposal.client}</p>
//                               <div className="proposal-meta">
//                                 <span className="budget">Budget: {proposal.budget}</span>
//                                 <span className="date">
//                                   Started: {new Date(proposal.startDate).toLocaleDateString()}
//                                 </span>
//                               </div>
//                               {proposal.status === "In Progress" && (
//                                 <div className="progress-section">
//                                   <div className="progress-header">
//                                     <span>Progress</span>
//                                     <span>{proposal.progress}%</span>
//                                   </div>
//                                   <Progress value={proposal.progress} className="progress-bar" />
//                                   <span className="deadline">
//                                     Deadline: {new Date(proposal.deadline).toLocaleDateString()}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="projects" className="tab-content">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>My Projects</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="projects-grid">
//                         {freelancer.recentProjects.map((project) => (
//                           <div key={project.id} className="project-card detailed">
//                             <img
//                               src={project.image || "/placeholder.svg"}
//                               alt={project.title}
//                               className="project-image"
//                             />
//                             <div className="project-info">
//                               <h4>{project.title}</h4>
//                               <p className="client">Client: {project.client}</p>
//                               <div className="project-meta">
//                                 <span className="budget">{project.budget}</span>
//                                 <Badge
//                                   variant={project.status === "Completed" ? "default" : "secondary"}
//                                   className="status"
//                                 >
//                                   {project.status}
//                                 </Badge>
//                               </div>
//                               {project.completedDate && (
//                                 <p className="completion-date">
//                                   Completed: {new Date(project.completedDate).toLocaleDateString()}
//                                 </p>
//                               )}
//                               {project.rating && (
//                                 <div className="project-rating">
//                                   <Star className="icon" />
//                                   <span>{project.rating}</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </>
//             )}
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FreelancerProfile


//create route
"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../../../hooks/useToast"
import { useAuth } from "../../../contexts/AuthContext"
import { getBasicProfile, getVerifiedProfile } from "../../../api/auth"
import { useProposals } from "../../../hooks/useProposals"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Star,
  Calendar,
  Briefcase,
  GraduationCap,
  Languages,
  Edit,
  MessageCircle,
  Heart,
  Share2,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import "./FreelancerProfile.scss"

function FreelancerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { user } = useAuth()
  const { proposals, fetchMyProposals } = useProposals()
  const [freelancer, setFreelancer] = useState(null)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFreelancerData = async () => {
      const isOwn = !id || user?.id?.toString() === id
      setIsOwnProfile(isOwn)

      try {
        if (isOwn && user) {
          // Load own profile data from API
          const [basicProfile, verifiedProfile] = await Promise.all([
            getBasicProfile(),
            getVerifiedProfile().catch(() => null), // Verified profile might not exist
          ])

          setFreelancer({
            ...user,
            ...basicProfile,
            ...verifiedProfile,
          })

          // Load proposals for own profile
          fetchMyProposals()
        } else {
          // Load other user's profile (mock data for now)
          setFreelancer({
            id: id,
            firstName: "John",
            lastName: "Doe",
            profession: "Full Stack Developer",
            location: "San Francisco, CA",
            bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications.",
            profilePicture:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            hourlyRate: 75,
            rating: 4.9,
            totalReviews: 127,
            completedProjects: 89,
            responseTime: "2 hours",
            availability: "Available",
            joinDate: "2020-03-15",
            skills: ["React", "Node.js", "Python", "AWS", "MongoDB", "TypeScript"],
            specializations: ["E-commerce platforms", "SaaS applications", "API development"],
          })
        }
      } catch (error) {
        showToast("Failed to load profile", "error")
      } finally {
        setLoading(false)
      }
    }

    loadFreelancerData()
  }, [id, user])

  const handleEditProfile = () => {
    navigate("/edit-freelancer-profile")
  }

  const handleHireMe = () => {
    showToast("Hire request sent!", "success")
  }

  const handleMessage = () => {
    navigate("/messages")
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

  if (!freelancer) {
    return <div className="error">Profile not found</div>
  }

  return (
    <div className="freelancer-profile">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="header-background"></div>
          <div className="header-content">
            <div className="profile-main">
              <Avatar className="profile-avatar">
                <AvatarImage
                  src={freelancer.profilePicture || "/placeholder.svg"}
                  alt={`${freelancer.firstName} ${freelancer.lastName}`}
                />
                <AvatarFallback>
                  {freelancer.firstName[0]}
                  {freelancer.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="profile-info">
                <div className="name-section">
                  <h1>
                    {freelancer.firstName} {freelancer.lastName}
                  </h1>
                  <p className="profession">{freelancer.profession}</p>
                  <div className="location">
                    <MapPin className="icon" />
                    <span>{freelancer.location}</span>
                  </div>
                </div>

                <div className="stats-section">
                  <div className="stat">
                    <Star className="icon" />
                    <span className="value">{freelancer.rating}</span>
                    <span className="label">({freelancer.totalReviews} reviews)</span>
                  </div>
                  <div className="stat">
                    <Briefcase className="icon" />
                    <span className="value">{freelancer.completedProjects}</span>
                    <span className="label">projects completed</span>
                  </div>
                  <div className="stat">
                    <Clock className="icon" />
                    <span className="value">{freelancer.responseTime}</span>
                    <span className="label">response time</span>
                  </div>
                </div>

                <div className="availability">
                  <Badge variant="secondary" className="status-badge available">
                    {freelancer.availability}
                  </Badge>
                  <span className="rate">${freelancer.hourlyRate}/hour</span>
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
                  <Button onClick={handleHireMe} className="hire-btn">
                    <Briefcase className="icon" />
                    Hire Me
                  </Button>
                  <Button onClick={handleMessage} variant="outline" className="message-btn">
                    <MessageCircle className="icon" />
                    Message
                  </Button>
                  <Button variant="outline" size="icon" className="favorite-btn">
                    <Heart className="icon" />
                  </Button>
                  <Button variant="outline" size="icon" className="share-btn">
                    <Share2 className="icon" />
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
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              {isOwnProfile && (
                <>
                  <TabsTrigger value="proposals">
                    Proposals {proposals?.length > 0 && `(${proposals?.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="projects">My Projects</TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="overview" className="tab-content">
              <div className="overview-grid">
                {/* About Section */}
                <Card className="about-card">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="bio">{freelancer.bio}</p>

                    <div className="details-grid">
                      <div className="detail-item">
                        <Calendar className="icon" />
                        <div>
                          <span className="label">Member since</span>
                          <span className="value">{new Date(freelancer.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="detail-item">
                        <Briefcase className="icon" />
                        <div>
                          <span className="label">Experience</span>
                          <span className="value">{freelancer.yearsOfExperience} years</span>
                        </div>
                      </div>
                      <div className="detail-item">
                        <GraduationCap className="icon" />
                        <div>
                          <span className="label">Education</span>
                          <span className="value">{freelancer.education}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Section */}
                <Card className="skills-card">
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="category-badge">
                      <Badge variant="outline">{freelancer.category}</Badge>
                    </div>

                    <div className="skills-section">
                      <h4>Technical Skills</h4>
                      <div className="skills-list">
                        {freelancer.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="skills-section">
                      <h4>Specializations</h4>
                      <div className="skills-list">
                        {freelancer.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="skills-section">
                      <h4>Languages</h4>
                      <div className="languages-list">
                        {freelancer.languages.map((language, index) => (
                          <div key={index} className="language-item">
                            <Languages className="icon" />
                            <span>{language}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="certifications-card">
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="certifications-list">
                      {freelancer.certifications.map((cert, index) => (
                        <div key={index} className="certification-item">
                          <Award className="icon" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="tab-content">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="portfolio-description">{freelancer.portfolioDescription}</p>

                  <div className="recent-projects">
                    <h3>Recent Projects</h3>
                    <div className="projects-grid">
                      {freelancer.recentProjects.map((project) => (
                        <div key={project.id} className="project-card">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="project-image"
                          />
                          <div className="project-info">
                            <h4>{project.title}</h4>
                            <p className="client">Client: {project.client}</p>
                            <div className="project-meta">
                              <span className="budget">{project.budget}</span>
                              <Badge
                                variant={project.status === "Completed" ? "default" : "secondary"}
                                className="status"
                              >
                                {project.status}
                              </Badge>
                            </div>
                            {project.rating && (
                              <div className="project-rating">
                                <Star className="icon" />
                                <span>{project.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="tab-content">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="reviews-summary">
                    <div className="rating-overview">
                      <div className="rating-score">
                        <span className="score">{freelancer.rating}</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`star ${i < Math.floor(freelancer.rating) ? "filled" : ""}`} />
                          ))}
                        </div>
                        <span className="total">({freelancer.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="reviews-list">
                    {freelancer.reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="client-info">
                            <Avatar className="client-avatar">
                              <AvatarFallback>{review.client[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4>{review.client}</h4>
                              <p className="project-name">{review.project}</p>
                            </div>
                          </div>
                          <div className="review-rating">
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`star ${i < Math.floor(review.rating) ? "filled" : ""}`} />
                              ))}
                            </div>
                            <span className="date">{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {isOwnProfile && (
              <>
                <TabsContent value="proposals" className="tab-content">
                  <div className="proposals-section">
                    <Card className="submitted-proposals">
                      <CardHeader>
                        <CardTitle>Submitted Proposals ({proposals?.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {proposals?.length > 0 ? (
                          <div className="proposals-list">
                            {proposals?.map((proposal) => (
                              <div key={proposal.id} className="proposal-item">
                                <div className="proposal-header">
                                  <div className="proposal-title-section">
                                    <h4>{proposal.jobTitle}</h4>
                                    {getStatusIcon(proposal.status)}
                                  </div>
                                  <Badge variant={getStatusVariant(proposal.status)} className="status-badge">
                                    {proposal.status}
                                  </Badge>
                                </div>
                                <p className="client">Client: {proposal.client}</p>
                                <p className="description">{proposal.description}</p>
                                <div className="proposal-meta">
                                  <div className="meta-item">
                                    <DollarSign className="icon" />
                                    <span>Bid: {proposal.proposedBudget}</span>
                                  </div>
                                  <div className="meta-item">
                                    <Clock className="icon" />
                                    <span>Timeline: {proposal.timeline}</span>
                                  </div>
                                  <div className="meta-item">
                                    <Calendar className="icon" />
                                    <span>Submitted: {new Date(proposal.submittedDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                {proposal.milestones && (
                                  <div className="milestones">
                                    <h5>Milestones:</h5>
                                    <p>{proposal.milestones}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-proposals">
                            <p>You haven't submitted any proposals yet.</p>
                            <Button onClick={() => navigate("/find-job")} className="browse-jobs-btn">
                              Browse Projects
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="accepted-proposals">
                      <CardHeader>
                        <CardTitle>Accepted Proposals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="proposals-list">
                          {freelancer.acceptedProposals.map((proposal) => (
                            <div key={proposal.id} className="proposal-item">
                              <div className="proposal-header">
                                <h4>{proposal.jobTitle}</h4>
                                <Badge variant={proposal.status === "Completed" ? "default" : "secondary"}>
                                  {proposal.status}
                                </Badge>
                              </div>
                              <p className="client">Client: {proposal.client}</p>
                              <div className="proposal-meta">
                                <span className="budget">Budget: {proposal.budget}</span>
                                <span className="date">
                                  Started: {new Date(proposal.startDate).toLocaleDateString()}
                                </span>
                              </div>
                              {proposal.status === "In Progress" && (
                                <div className="progress-section">
                                  <div className="progress-header">
                                    <span>Progress</span>
                                    <span>{proposal.progress}%</span>
                                  </div>
                                  <Progress value={proposal.progress} className="progress-bar" />
                                  <span className="deadline">
                                    Deadline: {new Date(proposal.deadline).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="tab-content">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="projects-grid">
                        {freelancer.recentProjects.map((project) => (
                          <div key={project.id} className="project-card detailed">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="project-image"
                            />
                            <div className="project-info">
                              <h4>{project.title}</h4>
                              <p className="client">Client: {project.client}</p>
                              <div className="project-meta">
                                <span className="budget">{project.budget}</span>
                                <Badge
                                  variant={project.status === "Completed" ? "default" : "secondary"}
                                  className="status"
                                >
                                  {project.status}
                                </Badge>
                              </div>
                              {project.completedDate && (
                                <p className="completion-date">
                                  Completed: {new Date(project.completedDate).toLocaleDateString()}
                                </p>
                              )}
                              {project.rating && (
                                <div className="project-rating">
                                  <Star className="icon" />
                                  <span>{project.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default FreelancerProfile
