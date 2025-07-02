import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  CLEAR_SHOPPING_CART_ITEM,
  REMOVE_SHOPPING_CART_ITEM,
  SET_SHOPPING_CART_ITEMS,
} from './mutationTypes'
import { shoppingCart } from './shoppingCart/shoppingCart'

afterEach(() => {
  vi.resetModules()
})

describe('shoppingCart store module', () => {
  it('it should mutation SET_SHOPPING_CART_ITEMS adds item', () => {
    const state = { shoppingCartItems: [] }
    const item = { id: 1, price: 10 }
    shoppingCart.mutations[SET_SHOPPING_CART_ITEMS](state, item)
    expect(state.shoppingCartItems).toContain(item)
  })

  it('it should mutation REMOVE_SHOPPING_CART_ITEM removes by id', () => {
    const state = { shoppingCartItems: [{ id: '1' }, { id: '2' }] }
    shoppingCart.mutations[REMOVE_SHOPPING_CART_ITEM](state, '1')
    expect(state.shoppingCartItems).toEqual([{ id: '2' }])
  })

  it('it should mutation CLEAR_SHOPPING_CART_ITEM clears all', () => {
    const state = { shoppingCartItems: [{ id: 1 }] }
    shoppingCart.mutations[CLEAR_SHOPPING_CART_ITEM](state)
    expect(state.shoppingCartItems).toEqual([])
  })

  it('it should allShoppingCartItems returns items', () => {
    const items = [{ id: 1 }]
    const state = { shoppingCartItems: items }
    expect(shoppingCart.getters.allShoppingCartItems(state)).toEqual(items)
  })
})
