import { afterEach, describe, expect, it, vi } from 'vitest'
import { GET_MOVIES, SET_MOVIES } from '../mutationTypes'
import { movie } from './movie'

afterEach(() => {
  vi.resetModules()
})

describe('movie store module', () => {
  it('it should mutation SET_MOVIES sets movies', () => {
    const state = { movies: [] }
    const movies = [{ id: 1, title: 'Movie' }]
    movie.mutations[SET_MOVIES](state, movies)
    expect(state.movies).toEqual(movies)
  })

  it('it should allMovies returns movies', () => {
    const movies = [{ id: 2, title: 'M2' }]
    const state = { movies }
    expect(movie.getters.allMovies(state)).toEqual(movies)
  })

  it('it should action GET_MOVIES commits movies from service with formatted data', async () => {
    const moviesRaw = [{ id: 3, title: 'M3', release_date: '2020-01-01' }]
    vi.doMock('@/services/MoviesService', () => ({
      default: { getPopularMovies: () => Promise.resolve({ results: moviesRaw }) },
    }))
    vi.doMock('../utils', () => ({
      getlocaleDateString: () => '01 de janeiro de 2020',
      getRandomPrice: () => '55.00',
    }))
    const { movie } = await import('./movie')
    const commit = vi.fn()
    const result = await movie.actions[GET_MOVIES]({ commit })
    expect(commit).toHaveBeenCalledWith(SET_MOVIES, expect.any(Array))
    expect(result[0]).toMatchObject({
      id: 3,
      title: 'M3',
      release_date: '01 de janeiro de 2020',
      price: '55.00',
    })
  })
})
