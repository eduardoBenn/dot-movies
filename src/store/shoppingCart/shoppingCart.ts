import type { IMovie } from '@/interfaces/Imovie'
import type { IShoppingCart } from '@/interfaces/IShoppingCart'
import {
  CLEAR_SHOPPING_CART_ITEM,
  REMOVE_SHOPPING_CART_ITEM,
  SET_SHOPPING_CART_ITEMS,
} from '../mutationTypes'

export interface ShoppingCartState {
  shoppingCartItems: IMovie[]
}

export const shoppingCart = {
  state: {
    shoppingCartItems: [],
  },
  mutations: {
    [SET_SHOPPING_CART_ITEMS](state, shoppingCartItem: IShoppingCart) {
      state.shoppingCartItems.push(shoppingCartItem)
    },
    [REMOVE_SHOPPING_CART_ITEM](state, id: string) {
      state.shoppingCartItems = state.shoppingCartItems.filter((item) => item.id != id)
    },
    [CLEAR_SHOPPING_CART_ITEM](state) {
      state.shoppingCartItems = []
    },
  },
  getters: {
    allShoppingCartItems: (state: ShoppingCartState) => {
      return state.shoppingCartItems
    },
    totalPrice: (state: ShoppingCartState): number =>
      state.shoppingCartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
  },
}
