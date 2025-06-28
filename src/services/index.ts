import axios, { type AxiosInstance } from "axios";

export const API_KEY = import.meta.env.VITE_API_KEY;

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-type": "application/json",
  },
});

export default httpClient;
