// src/components/ShoppingCart/test_ShoppingCart.vue
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ShoppingCart from './ShoppingCart.vue'
import { mockCommit, mockGetters, mockPush, mountWithGlobal, TrashIcon } from './test.utils'

vi.mock('@/store', () => ({
  useStore: () => ({
    getters: mockGetters,
    commit: mockCommit,
  }),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('ShoppingCart.vue', () => {
  beforeEach(() => {
    mockCommit.mockClear()
    mockPush.mockClear()
  })

  it.each([
    { title: 'movie 1', price: 'R$10' },
    { title: 'movie 2', price: 'R$20' },
  ])('it should render cart items and total price', ({ title, price }) => {
    const totalPrice = '30'
    const wrapper = mountWithGlobal(ShoppingCart, { TrashIcon })
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(price)
    expect(wrapper.text()).toContain(totalPrice)
  })

  it('it should clear clearShoppingItems on button click', async () => {
    const wrapper = mountWithGlobal(ShoppingCart, { TrashIcon })
    await wrapper.find('[data-testid="clear-items-button"]').trigger('click')
    expect(mockCommit).toHaveBeenCalledWith('CLEAR_SHOPPING_CART_ITEM')
  })

  it('it should remove item when TrashIcon is clicked', async () => {
    const wrapper = mountWithGlobal(ShoppingCart, { TrashIcon })
    const trashIcons = wrapper.findAllComponents(TrashIcon)
    await trashIcons[0].trigger('click')
    expect(mockCommit).toHaveBeenCalledWith('REMOVE_SHOPPING_CART_ITEM', '1')
  })

  it('it should navigate to /shopping on when finish the purchase', async () => {
    const wrapper = mountWithGlobal(ShoppingCart, { TrashIcon })
    await wrapper.find('[data-testid="finish-purchase"]').trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/shopping')
  })

  it('renders correctly with empty cart', () => {
    const emptyGetters = { allShoppingCartItems: [], totalPrice: 0 }
    const useStore = vi.fn().mockReturnValue({
      getters: emptyGetters,
      commit: mockCommit,
    })

    vi.doMock('@/store', () => ({ useStore }))
    const wrapper = mountWithGlobal(ShoppingCart, { TrashIcon })

    expect(wrapper.text()).toContain('Total:')
    expect(wrapper.text()).toContain('0')
    expect(wrapper.findAll('[data-testid="cart-item"]').length).toBe(2)
  })
})
