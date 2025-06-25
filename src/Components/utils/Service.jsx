// src/API/config.js
export const BASE_URL = "https://hastin-container.com/staging/api";
 export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Missing auth token");
  }

  return {
    headers: {
      Authorization: `BslogiKey ${token}`,
      "Content-Type": "application/json",
      aid:"86f15c81-66d3-4237-bb29-6c4e7a9daacf",
    },
  };
};
//
