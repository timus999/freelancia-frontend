// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  TIMEOUT: 10000, // 10 seconds

  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      SIGNUP: "/signup",
      LOGIN: "/login",
      LOGOUT: "/logout",
      PROFILE_BASIC: "/profile/basic",
      PROFILE_VERIFIED: "/profile/verified",
    },
    JOBS: {
      BASE: "/jobs",
      BY_ID: (id) => `/jobs/${id}`,
      BY_CATEGORY: (category) => `/jobs?category=${category}`,
    },
    PROPOSALS: {
      BASE: "/proposals/",
      MY_PROPOSALS: "/proposals/me",
      JOB_PROPOSALS: (jobId) => `/proposals/job/${jobId}`,
      BY_ID: (id) => `/proposals/${id}`,
    },
  },
}

export default API_CONFIG
