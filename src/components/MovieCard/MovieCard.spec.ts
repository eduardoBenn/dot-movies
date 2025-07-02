import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import MovieCard from './MovieCard.vue'
import { mockAdd, mockCommit, mockGetters, mockMovie, mountWithGlobal } from './test.utils'

vi.mock('@/store', () => ({
  useStore: () => ({
    getters: mockGetters,
    commit: mockCommit,
  }),
}))

vi.mock('primevue', () => ({
  Toast: { template: '<div />' },
  useToast: () => ({ add: mockAdd }),
}))

vi.mock('@/services/MoviesService', () => ({
  default: {
    getMoviesImages: vi.fn(() => Promise.resolve({ posters: [{ file_path: '/img.jpg' }] })),
  },
}))

vi.mock('@/services', () => ({
  imageBaseUrl: 'https://img.tmdb.org/t/p/w500',
}))

describe('MovieCard.vue', () => {
  beforeEach(() => {
    mockCommit.mockClear()
    mockAdd.mockClear()
    mockGetters.allFavorites = []
  })

  it.each(['Test Movie', '2024-01-01', 'R$42', 'Action', '8.5'])(
    'it should render movie props',
    async (cardText: string) => {
      const wrapper = mount(MovieCard, { props: { movieProp: mockMovie } })
      expect(wrapper.text()).toContain(cardText)
      await new Promise((r) => setTimeout(r, 0))
      expect(wrapper.find('img').attributes('src')).toContain('/img.jpg')
    }
  )

  it('it should render up to 3 genres', () => {
    const wrapper = mountWithGlobal(MovieCard, { genre_ids: [1, 2, 3, 4] })
    expect(wrapper.findAll('[data-testid="movie-genre"]').length).toBe(3)
  })

  it('it should call addToFavorites on heart icon click', async () => {
    const wrapper = mount(MovieCard, { props: { movieProp: mockMovie } })
    await wrapper.find('[data-testid="add-favorites"]').trigger('click')
    expect(mockCommit).toHaveBeenCalledWith('ADD_FAVORITES', mockMovie)
  })

  it('it should call addToShoppingCartItem and shows toast', async () => {
    const wrapper = mount(MovieCard, { props: { movieProp: mockMovie } })
    const addBtn = wrapper.findAll('button').at(1)
    await addBtn?.trigger('click')
    expect(mockCommit).toHaveBeenCalledWith('SET_SHOPPING_CART_ITEMS', mockMovie)
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ detail: 'Adicionado com sucesso!' })
    )
  })

  it('it should show heart as highlighted if already favorite', () => {
    mockGetters.allFavorites = [{ ...mockMovie }]
    const wrapper = mount(MovieCard, { props: { movieProp: mockMovie } })
    const heartBtn = wrapper.find('[data-testid="add-favorites"]')
    const heartIcon = heartBtn.find('svg')
    expect(heartIcon.classes()).toContain('text-red-500')
  })

  it('it should handle when there is no genres', () => {
    const wrapper = mount(MovieCard, { props: { movieProp: { ...mockMovie, genre_ids: [] } } })
    expect(wrapper.findAll('[data-testid="movie-genre"]').length).toBe(0)
  })

  it('it should handle image fetch error', async () => {
    const MoviesService = (await import('@/services/MoviesService')).default
    MoviesService.getMoviesImages = vi.fn(() => Promise.reject('fail'))
    mount(MovieCard, { props: { movieProp: mockMovie } })
  })
})
