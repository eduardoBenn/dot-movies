import type { IMovie } from '@/interfaces/Imovie'
import MoviesService from '@/services/MoviesService'
import { GET_MOVIES, SET_MOVIES } from '../mutationTypes'
import { getlocaleDateString, getRandomPrice } from '../utils'

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
        const movies = response.results.map((movie: IMovie) => {
          return {
            ...movie,
            release_date: getlocaleDateString(movie.release_date),
            price: getRandomPrice(),
          }
        })

        commit(SET_MOVIES, movies)
        return movies
      })
    },
  },
  getters: {
    allMovies: (state: movieState) => {
      return state.movies
    },
  },
}
