import type { IFavorite } from '@/interfaces/Ifavorite'
import { ADD_FAVORITES } from '../mutationTypes'

export interface favoriteState {
  favorites: IFavorite[]
}

export const favorite = {
  state: {
    favorites: [],
  },
  mutations: {
    [ADD_FAVORITES](state, favorite: IFavorite) {
      state.favorites.push(favorite)
    },
  },
  getters: {
    allFavorites: (state: favoriteState) => {
      return state.favorites
    },
  },
}
