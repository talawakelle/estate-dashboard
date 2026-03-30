import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const baseURL = configuredBaseUrl && configuredBaseUrl.length > 0
  ? configuredBaseUrl
  : "http://127.0.0.1:8000/api";

export const client = axios.create({
  baseURL
});
