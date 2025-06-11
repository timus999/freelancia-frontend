// src/api/auth.js
import client from "./client";

export const login = async (data) => {
  const response = await client.post("/api/login", data);
  return response.data;
};

export const register = async (data) => {
    const response = await client.post("/api/signup", data);
    return response.data;
  };

  export const logout = async () => {
    const response = await client.post("/api/logout");
    return response.data;
  };