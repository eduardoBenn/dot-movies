import axios, { type AxiosInstance } from 'axios'

export const API_KEY = import.meta.env.VITE_API_KEY

export const apiBaseUrl = 'https://api.themoviedb.org/3/'
export const imageBaseUrl = 'https://image.tmdb.org/t/p/original/'

export const baseHttpClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-type': 'application/json',
  },
})

export const imageHttpClient: AxiosInstance = axios.create({
  baseURL: imageBaseUrl,
  headers: {
    'Content-type': 'application/json',
  },
})
