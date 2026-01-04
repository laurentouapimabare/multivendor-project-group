import axios from "axios";

const API_BASE_URL = 
  process.env.NODE_ENV === "production"
    ? "https://multivendor-project-group.onrender.com/api"
    : "http://localhost:5000/api";

export default axios.create({
  baseURL: API_BASE_URL
});
