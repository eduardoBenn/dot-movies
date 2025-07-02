import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import type { Component } from 'vue'

export const mockCommit = vi.fn()
export const mockGetters = {
  allShoppingCartItems: [
    { id: '1', title: 'movie 1', price: 10 },
    { id: '2', title: 'movie 2', price: 20 },
  ],
  totalPrice: 30,
}

export const mockPush = vi.fn()

export const TrashIcon = {
  template: '<svg @click="$emit(\'click\')" />',
}

export function mountWithGlobal<T extends Component>(component: T, components = {}) {
  return mount(component, {
    global: {
      components: {
        ...components,
      },
    },
  })
}
