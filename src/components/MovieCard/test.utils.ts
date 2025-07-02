import type { IFavorite } from '@/interfaces/Ifavorite'
import type { IGenre } from '@/interfaces/Imovie'
import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import type { Component } from 'vue'

export const mockCommit = vi.fn()
export const mockAdd = vi.fn()

interface IMockGetters {
  allGenres: IGenre[]
  allFavorites: IFavorite[]
}

export const mockMovie = {
  id: 1,
  title: 'Test Movie',
  release_date: '2024-01-01',
  vote_average: 8.5,
  genre_ids: [1, 2, 3],
  poster_path: '/img.jpg',
  price: '42',
}

export const mockGetters: IMockGetters = {
  allGenres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Fantasy' },
  ],
  allFavorites: [],
}

export function mountWithGlobal(component: Component, props = {}) {
  return mount(component, {
    props: { movieProp: { ...mockMovie, ...props } },
  })
}
