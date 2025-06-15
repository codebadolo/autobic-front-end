import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
});

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const demandesService = {
  getAll: () => apiClient.get("/demandes", { headers: getAuthHeaders() }).then(res => res.data),
  getById: (id) => apiClient.get(`/demandes/${id}`, { headers: getAuthHeaders() }).then(res => res.data),
  create: (demande) => apiClient.post("/demandes", demande, { headers: getAuthHeaders() }).then(res => res.data),
  update: (id, demande) => apiClient.put(`/demandes/${id}`, demande, { headers: getAuthHeaders() }).then(res => res.data),
  delete: (id) => apiClient.delete(`/demandes/${id}`, { headers: getAuthHeaders() }).then(res => res.data),
  getStatsByStatus: () => apiClient.get("/demandes/stats/status", { headers: getAuthHeaders() }).then(res => res.data)
};

export default demandesService;
