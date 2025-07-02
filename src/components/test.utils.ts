import { vi } from 'vitest'

export const dispatch = vi.fn()

export const mockMovies = [
  { id: 1, title: 'movie 1' },
  { id: 2, title: 'movie 2' },
]

export const getters = { allMovies: mockMovies }
