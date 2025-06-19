import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { searchFreelancers, inviteFreelancer } from "../../api/job"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  Star,
  Briefcase,
  DollarSign,
  MessageCircle,
  UserPlus,
  Filter,
  Users,
  Award,
} from "lucide-react"
import "./FreelancerSearch.scss"

export default function FreelancerSearch() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    skill: "",
    experience_min: "",
    rate_min: "",
    rate_max: "",
    location: "",
  })

  const fetchFreelancers = async () => {
    setLoading(true)
    try {
      const data = await searchFreelancers(filters)
      setFreelancers(data)
    } catch (error) {
      showToast("Failed to fetch freelancers", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFreelancers()
  }, [])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    fetchFreelancers()
  }

  const handleInviteFreelancer = async (freelancerId, jobId) => {
    try {
      await inviteFreelancer(jobId, freelancerId)
      showToast("Invitation sent successfully!", "success")
    } catch (error) {
      showToast("Failed to send invitation", "error")
    }
  }

  const handleMessageFreelancer = (freelancerId) => {
    navigate(`/message/${freelancerId}`)
  }

  return (
    <div className="freelancer-search-page">
      <div className="freelancer-search-container">
        {/* Header */}
        <div className="search-header">
          <h1 className="search-title">Find Freelancers</h1>
          <p className="search-subtitle">Discover talented freelancers for your projects</p>
        </div>

        {/* Filters */}
        <Card className="filters-card">
          <CardHeader>
            <CardTitle className="filters-title">
              <Filter className="icon" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Skill</label>
                <Input
                  placeholder="e.g., React, Python, Design"
                  value={filters.skill}
                  onChange={(e) => handleFilterChange("skill", e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Location</label>
                <Input
                  placeholder="e.g., New York, Remote"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Min Experience (years)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.experience_min}
                  onChange={(e) => handleFilterChange("experience_min", e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Min Rate ($/hr)</label>
                <Input
                  type="number"
                  placeholder="10"
                  value={filters.rate_min}
                  onChange={(e) => handleFilterChange("rate_min", e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Max Rate ($/hr)</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={filters.rate_max}
                  onChange={(e) => handleFilterChange("rate_max", e.target.value)}
                />
              </div>
              <div className="filter-group">
                <Button onClick={handleSearch} className="search-btn">
                  <Search className="icon" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="results-section">
          <div className="results-header">
            <h2>
              <Users className="icon" />
              {freelancers.length} Freelancers Found
            </h2>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Searching freelancers...</p>
            </div>
          ) : (
            <div className="freelancers-grid">
              {freelancers.map((freelancer) => (
                <Card key={freelancer.id} className="freelancer-card">
                  <CardContent className="freelancer-content">
                    <div className="freelancer-header">
                      <Avatar className="freelancer-avatar">
                        <AvatarImage src={freelancer.profile_picture || "/placeholder.svg"} alt={freelancer.name} />
                        <AvatarFallback>{freelancer.name?.[0] || "F"}</AvatarFallback>
                      </Avatar>
                      <div className="freelancer-info">
                        <h3 className="freelancer-name">{freelancer.name}</h3>
                        <p className="freelancer-title">{freelancer.title}</p>
                        <div className="freelancer-location">
                          <MapPin className="icon" />
                          <span>{freelancer.location}</span>
                        </div>
                      </div>
                      <div className="freelancer-rate">
                        <DollarSign className="icon" />
                        <span>${freelancer.hourly_rate}/hr</span>
                      </div>
                    </div>

                    <div className="freelancer-stats">
                      <div className="stat">
                        <Star className="icon" />
                        <span>{freelancer.rating || "5.0"}</span>
                        <span className="stat-label">({freelancer.reviews_count || 0} reviews)</span>
                      </div>
                      <div className="stat">
                        <Briefcase className="icon" />
                        <span>{freelancer.completed_projects || 0}</span>
                        <span className="stat-label">projects</span>
                      </div>
                      <div className="stat">
                        <Award className="icon" />
                        <span>{freelancer.experience_years || 0}+</span>
                        <span className="stat-label">years exp</span>
                      </div>
                    </div>

                    <div className="freelancer-bio">
                      <p>{freelancer.bio || "Experienced freelancer ready to help with your projects."}</p>
                    </div>

                    <div className="freelancer-skills">
                      {freelancer.skills?.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="skill-badge">
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills?.length > 5 && (
                        <Badge variant="outline" className="more-skills">
                          +{freelancer.skills.length - 5} more
                        </Badge>
                      )}
                    </div>

                    <div className="freelancer-actions">
                      <Button
                        onClick={() => navigate(`/freelancer-profile/${freelancer.id}`)}
                        variant="outline"
                        className="view-profile-btn"
                      >
                        View Profile
                      </Button>
                      <Button
                        onClick={() => handleMessageFreelancer(freelancer.id)}
                        variant="outline"
                        className="message-btn"
                      >
                        <MessageCircle className="icon" />
                        Message
                      </Button>
                      <Button
                        onClick={() => handleInviteFreelancer(freelancer.wallet_address, "current-job-id")}
                        className="invite-btn"
                      >
                        <UserPlus className="icon" />
                        Invite
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && freelancers.length === 0 && (
            <div className="no-results">
              <Users className="no-results-icon" />
              <h3>No freelancers found</h3>
              <p>Try adjusting your search filters to find more freelancers.</p>
              <Button onClick={() => setFilters({})} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
