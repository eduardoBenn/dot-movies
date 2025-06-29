import type { InjectionKey } from 'vue'
// @ts-expect-error: vuex compability issue with Typescript
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { favorite, type favoriteState } from './favorites/favorites'
import { genre, type genreState } from './movies/genre'
import { movie, type movieState } from './movies/movie'
import type { ShoppingCartState } from './shoppingCart/shoppingCart'
import { shoppingCart } from './shoppingCart/shoppingCart'

export const key: InjectionKey<Store<StoreState>> = Symbol()

export interface StoreState {
  movies: movieState[]
  genres: genreState[]
  favorites: favoriteState[]
  shoppingCartItems: ShoppingCartState[]
}

export const store = createStore({
  state: {
    movie: {
      movies: [],
    },
    genre: {
      genres: [],
    },
    favorite: {
      favorites: [],
    },
    shoppingCart: {
      shoppingCartItems: [],
    },
  },
  modules: {
    movie,
    genre,
    favorite,
    shoppingCart,
  },
})

export function useStore(): Store<StoreState> {
  return vuexUseStore(key)
}
