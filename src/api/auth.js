// import apiClient from "./client"

// export const register = async (userData) => {
//   try {
//     const response = await apiClient.post("/signup", userData)
//     return response.data
//   } catch (error) {
//     throw error.response?.data || error.message
//   }
// }

// export const login = async (credentials) => {
//   try {
//     const response = await apiClient.post("/login", credentials)
//     return response.data
//   } catch (error) {
//     throw error.response?.data || error.message
//   }
// }

// export const logout = async () => {
//   try {
//     const response = await apiClient.post("/logout")
//     return response.data
//   } catch (error) {
//     throw error.response?.data || error.message
//   }
// }

// export const getProfile = async () => {
//   try {
//     const response = await apiClient.get("/profile/basic")
//     return response.data
//   } catch (error) {
//     throw error.response?.data || error.message
//   }
// }

// export const getVerifiedProfile = async () => {
//   try {
//     const response = await apiClient.get("/profile/verified")
//     return response.data
//   } catch (error) {
//     throw error.response?.data || error.message
//   }
// }

// export const updateProfile = async (profileData) => {
//   try {
//     const response = await apiClient.put("/profile", profileData)
//     return response.data
//   } catch (error) {
//     throw error.response?.data || error.message
//   }
// }




import apiClient from "./client"

export const register = async (userData) => {
  try {
    const response = await apiClient.post("/signup", userData)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const logout = async () => {
  try {
    const response = await apiClient.post("/logout")
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getBasicProfile = async () => {
  try {
    const response = await apiClient.get("/profile/basic")
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getVerifiedProfile = async () => {
  try {
    const response = await apiClient.get("/profile/verified")
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const updateProfile = async (profileData) => {
  try {
    const response = await apiClient.put("/profile", profileData)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}
