import axios from "axios";
const API_URL = "http://localhost:8080/api/auth"; // adapte si besoin

export function login(username, password) {
  return axios.post(`${API_URL}/login`, { username, password });
}
export function register(user) {
  return axios.post(`${API_URL}/register`, user);
}
