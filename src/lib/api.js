import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ On pointe bien sur l'API du backend
});

export default api;
