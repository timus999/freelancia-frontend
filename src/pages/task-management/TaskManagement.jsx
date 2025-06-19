"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import { useAuth } from "../../contexts/AuthContext"
import { getJobById, addJobTask } from "../../api/job"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Plus, Clock, User, Calendar, Edit, Trash2, MessageSquare } from "lucide-react"
import "./TaskManagement.scss"

export default function TaskManagement() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    priority: "medium",
    dueDate: "",
  })
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchJobDetails()
    loadTasks()
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

  const loadTasks = () => {
    // Load tasks from localStorage (in real app, this would be from API)
    const storedTasks = localStorage.getItem(`tasks_${jobId}`)
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      // Default tasks for demo
      const defaultTasks = [
        {
          id: 1,
          name: "Project Setup",
          description: "Initialize project structure and dependencies",
          completed: true,
          priority: "high",
          dueDate: "2024-01-15",
          assignee: "freelancer",
          createdAt: "2024-01-10",
        },
        {
          id: 2,
          name: "Design Mockups",
          description: "Create initial design mockups for client review",
          completed: true,
          priority: "high",
          dueDate: "2024-01-20",
          assignee: "freelancer",
          createdAt: "2024-01-12",
        },
        {
          id: 3,
          name: "Frontend Development",
          description: "Implement the user interface based on approved designs",
          completed: false,
          priority: "high",
          dueDate: "2024-01-30",
          assignee: "freelancer",
          createdAt: "2024-01-15",
        },
        {
          id: 4,
          name: "Backend API",
          description: "Develop REST API endpoints for data management",
          completed: false,
          priority: "medium",
          dueDate: "2024-02-05",
          assignee: "freelancer",
          createdAt: "2024-01-15",
        },
        {
          id: 5,
          name: "Testing & QA",
          description: "Comprehensive testing and quality assurance",
          completed: false,
          priority: "medium",
          dueDate: "2024-02-10",
          assignee: "freelancer",
          createdAt: "2024-01-15",
        },
      ]
      setTasks(defaultTasks)
      localStorage.setItem(`tasks_${jobId}`, JSON.stringify(defaultTasks))
    }
  }

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks)
    localStorage.setItem(`tasks_${jobId}`, JSON.stringify(updatedTasks))
  }

  const handleAddTask = async () => {
    if (!newTask.name.trim()) {
      showToast("Please enter a task name", "error")
      return
    }

    setIsAddingTask(true)
    try {
      // In real app, this would call the API
      await addJobTask(jobId, newTask.name)

      const task = {
        id: Date.now(),
        name: newTask.name,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        assignee: user?.role === "client" ? "freelancer" : "client",
        createdAt: new Date().toISOString(),
      }

      const updatedTasks = [...tasks, task]
      saveTasks(updatedTasks)

      setNewTask({
        name: "",
        description: "",
        priority: "medium",
        dueDate: "",
      })
      setShowAddForm(false)
      showToast("Task added successfully!", "success")
    } catch (error) {
      showToast("Failed to add task", "error")
    } finally {
      setIsAddingTask(false)
    }
  }

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    saveTasks(updatedTasks)
    showToast("Task updated!", "success")
  }

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    saveTasks(updatedTasks)
    showToast("Task deleted", "success")
  }

  const getCompletionPercentage = () => {
    if (tasks.length === 0) return 0
    const completedTasks = tasks.filter((task) => task.completed).length
    return Math.round((completedTasks / tasks.length) * 100)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      case "low":
        return "🟢"
      default:
        return "⚪"
    }
  }

  if (loading) {
    return (
      <div className="task-management-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="task-management-page">
        <div className="error-state">
          <h2>Job not found</h2>
          <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
        </div>
      </div>
    )
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = getCompletionPercentage()

  return (
    <div className="task-management-page">
      <div className="task-management-container">
        {/* Header */}
        <div className="task-header">
          <div className="header-content">
            <h1 className="task-title">Task Management</h1>
            <Badge variant="secondary" className="progress-badge">
              {completedTasks}/{totalTasks} Completed
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
                <span className="label">Status:</span>
                <span className="value">{job.status?.replace("_", " ")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="progress-overview-card">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="progress-stats">
              <div className="stat">
                <h3>{completionPercentage}%</h3>
                <p>Complete</p>
              </div>
              <div className="stat">
                <h3>{completedTasks}</h3>
                <p>Tasks Done</p>
              </div>
              <div className="stat">
                <h3>{totalTasks - completedTasks}</h3>
                <p>Remaining</p>
              </div>
            </div>
            <div className="progress-bar-container">
              <div className="progress-header">
                <span>Overall Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="progress-bar" />
            </div>
          </CardContent>
        </Card>

        {/* Add Task Section */}
        <Card className="add-task-card">
          <CardHeader>
            <div className="add-task-header">
              <CardTitle>Tasks</CardTitle>
              <Button onClick={() => setShowAddForm(!showAddForm)} className="add-task-btn">
                <Plus className="icon" />
                Add Task
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddForm && (
              <div className="add-task-form">
                <div className="form-row">
                  <div className="form-group">
                    <Label htmlFor="task-name">Task Name *</Label>
                    <Input
                      id="task-name"
                      placeholder="Enter task name"
                      value={newTask.name}
                      onChange={(e) => setNewTask((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="task-priority">Priority</Label>
                    <select
                      id="task-priority"
                      value={newTask.priority}
                      onChange={(e) => setNewTask((prev) => ({ ...prev, priority: e.target.value }))}
                      className="priority-select"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <Label htmlFor="task-due-date">Due Date</Label>
                    <Input
                      id="task-due-date"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea
                    id="task-description"
                    placeholder="Enter task description (optional)"
                    value={newTask.description}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="form-actions">
                  <Button onClick={handleAddTask} disabled={isAddingTask} className="submit-btn">
                    {isAddingTask ? (
                      <>
                        <div className="spinner" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="icon" />
                        Add Task
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Tasks List */}
            <div className="tasks-list">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                    <div className="task-checkbox">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(task.id)}
                        className="task-check"
                      />
                    </div>
                    <div className="task-content">
                      <div className="task-header">
                        <h4 className="task-name">{task.name}</h4>
                        <div className="task-meta">
                          <Badge variant={getPriorityColor(task.priority)} className="priority-badge">
                            {getPriorityIcon(task.priority)} {task.priority}
                          </Badge>
                          {task.dueDate && (
                            <div className="due-date">
                              <Calendar className="icon" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {task.description && <p className="task-description">{task.description}</p>}
                      <div className="task-footer">
                        <div className="task-assignee">
                          <User className="icon" />
                          <span>Assigned to {task.assignee}</span>
                        </div>
                        <div className="task-actions">
                          <Button variant="ghost" size="sm" className="edit-btn">
                            <Edit className="icon" />
                          </Button>
                          <Button variant="ghost" size="sm" className="comment-btn">
                            <MessageSquare className="icon" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                            className="delete-btn"
                          >
                            <Trash2 className="icon" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-tasks">
                  <Clock className="icon" />
                  <h3>No tasks yet</h3>
                  <p>Add your first task to get started with project management.</p>
                  <Button onClick={() => setShowAddForm(true)} className="add-first-task-btn">
                    <Plus className="icon" />
                    Add First Task
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
