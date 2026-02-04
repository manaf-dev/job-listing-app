
import axios from "axios";

const AUTH_TOKEN_KEY = "employerToken";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
  window.dispatchEvent(new Event("storage"));
};

export const authHeader = () => {
  const token = getAuthToken();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};
