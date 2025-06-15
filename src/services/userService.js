import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  }
});


function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const userService = {
  getAll: () => apiClient.get("/admin/users", { headers: getAuthHeaders() }).then(res => res.data),

  create: (user) => apiClient.post("/admin/users", user, { headers: getAuthHeaders() }).then(res => res.data),

  update: (matricule, user) => apiClient.put(`/admin/users/${matricule}`, user, { headers: getAuthHeaders() }).then(res => res.data),

  delete: (matricule) => apiClient.delete(`/admin/users/${matricule}`, { headers: getAuthHeaders() }).then(res => res.data)
};

export default userService;
