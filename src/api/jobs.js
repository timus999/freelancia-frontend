import client from "./client";

export const getCategories = async () => {
  const response = await client.get("/api/jobs/categories");
  return response.data;
};