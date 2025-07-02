import { describe, expect, it } from 'vitest'
import { ADD_FAVORITES } from '../mutationTypes'
import { favorite } from './favorites'

describe('favorites store module', () => {
  it('it should mutation ADD_FAVORITES adds favorite', () => {
    const state = { favorites: [] }
    const fav = { id: 1, title: 'Fav' }
    favorite.mutations[ADD_FAVORITES](state, fav)
    expect(state.favorites).toContain(fav)
  })

  it('it should allFavorites returns favorites', () => {
    const fav = { id: 2, title: 'Fav2' }
    const state = { favorites: [fav] }
    expect(favorite.getters.allFavorites(state)).toEqual([fav])
  })
})
