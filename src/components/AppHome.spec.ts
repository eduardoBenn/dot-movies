import { GET_GENRES, GET_MOVIES } from '@/store/mutationTypes'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import AppHome from './AppHome.vue'
import { dispatch, getters, mockMovies } from './test.utils'

vi.mock('@/components/MovieCard/MovieCard.vue', () => ({
  default: {
    name: 'MovieCard',
    props: ['movieProp'],
    template: '<div class="movie-card">{{ movieProp.title }}</div>',
  },
}))

vi.mock('@/store', () => ({
  useStore: () => ({
    dispatch,
    getters,
  }),
}))

vi.mock('@/store/mutationTypes', () => ({
  GET_GENRES: GET_GENRES,
  GET_MOVIES: GET_MOVIES,
}))

describe('AppHome.vue', () => {
  beforeEach(() => {
    dispatch.mockClear()
  })

  it('it should dispatch action and genres on mount', () => {
    mount(AppHome)
    expect(dispatch).toHaveBeenCalledWith(GET_GENRES)
    expect(dispatch).toHaveBeenCalledWith(GET_MOVIES)
  })

  it.each(mockMovies)('should build a MovieCard for each movie', ({ title }) => {
    const wrapper = mount(AppHome)
    const cards = wrapper.findAll('.movie-card')
    expect(cards.length).toBe(mockMovies.length)
    expect(cards[0].text()).toContain({ title })
    expect(cards[1].text()).toContain({ title })
  })
})
