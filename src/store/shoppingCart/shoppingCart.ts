import type { IShoppingCart } from '@/interfaces/IShoppingCart'
import { SET_SHOPPING_CART_ITEMS } from '../mutationTypes'

export interface ShoppingCartState {
  shoppingCartItems: []
}

export const shoppingCart = {
  state: {
    shoppingCartItems: [],
  },
  mutations: {
    [SET_SHOPPING_CART_ITEMS](state, shoppingCartItem: IShoppingCart) {
      state.shoppingCartItems.push(shoppingCartItem)
    },
  },
  getters: {
    allShoppingCartItems: (state: ShoppingCartState) => {
      return state.shoppingCartItems
    },
  },
}
