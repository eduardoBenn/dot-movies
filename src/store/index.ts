import type { InjectionKey } from 'vue'
// @ts-expect-error: vuex compability issue with Typescript
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { genre, type genreState } from './movies/genre'
import { movie, type movieState } from './movies/movie'

export const key: InjectionKey<Store<StoreState>> = Symbol()

export interface StoreState {
  movies: movieState[]
  genres: genreState[]
}

export const store = createStore({
  state: {
    movie: {
      movies: [],
    },
    genre: {
      genres: [],
    },
  },
  mutations: {},
  modules: {
    movie,
    genre,
  },
})

export function useStore(): Store<StoreState> {
  return vuexUseStore(key)
}
