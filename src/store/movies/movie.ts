import type { IMovie } from '@/interfaces/Imovie'
import MoviesService from '@/services/MoviesService'
import { GET_MOVIES, SET_MOVIES } from '../mutationTypes'

export interface movieState {
  movies: IMovie[]
}

export const movie = {
  state: {
    movies: [],
  },
  mutations: {
    [SET_MOVIES](state, movies: IMovie[]) {
      state.movies = movies
    },
  },
  actions: {
    [GET_MOVIES]({ commit }, page?: number) {
      return MoviesService.getPopularMovies(page).then((response) => {
        commit(SET_MOVIES, response.results)
      })
    },
  },
  getters: {
    allMovies: (state: movieState) => {
      return state.movies
    },
  },
}
