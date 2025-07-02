import { afterEach, describe, expect, it, vi } from 'vitest'
import { GET_GENRES, SET_GENRES } from '../mutationTypes'

afterEach(() => {
  vi.resetModules()
})

describe('genre store module', () => {
  it('it should mutation SET_GENRES sets genres', async () => {
    const { genre } = await import('./genre')
    const state = { genres: [] }
    const genres = [{ id: 1, name: 'Action' }]
    genre.mutations[SET_GENRES](state, genres)
    expect(state.genres).toEqual(genres)
  })

  it('it should allGenres returns genres', async () => {
    const { genre } = await import('./genre')
    const genres = [{ id: 2, name: 'Comedy' }]
    const state = { genres }
    expect(genre.getters.allGenres(state)).toEqual(genres)
  })

  it('it should action GET_GENRES commits genres from service', async () => {
    const genres = [{ id: 3, name: 'Drama' }]
    vi.doMock('@/services/MoviesService', () => ({
      default: {
        getMoviesGenres: () => Promise.resolve({ genres }),
      },
    }))
    const { genre } = await import('./genre')
    const commit = vi.fn()
    await genre.actions[GET_GENRES]({ commit })
    expect(commit).toHaveBeenCalledWith(SET_GENRES, genres)
  })
})
