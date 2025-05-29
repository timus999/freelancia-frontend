import client from "./client";

export const createJob = async (data) => {
  const response = await client.post("/api/jobs", data);
  return response.data;
};