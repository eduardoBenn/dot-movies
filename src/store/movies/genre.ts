import type { IGenre } from '@/interfaces/Imovie'
import MoviesService from '@/services/MoviesService'
import { GET_GENRES, SET_GENRES } from '../mutationTypes'

export interface genreState {
  genres: IGenre[]
}

export const genre = {
  state: {
    genres: [],
  },
  mutations: {
    [SET_GENRES](state, genres: IGenre[]) {
      state.genres = genres
    },
  },
  actions: {
    [GET_GENRES]({ commit }) {
      return MoviesService.getMoviesGenres().then((response) => {
        commit(SET_GENRES, response.genres)
      })
    },
  },
  getters: {
    allGenres: (state: genreState) => {
      return state.genres
    },
  },
}
