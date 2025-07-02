import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import App from './App.vue'

vi.mock('./components/AppHeader/AppHeader.vue', () => ({
  default: {
    template: '<button @click="$emit(\'toggle-theme\')">Header</button>',
    props: ['onToggleTheme', 'isDark'],
  },
}))

vi.mock('vue-router', () => ({
  RouterView: { template: '<div>RouterView</div>' },
}))

describe.only('App.vue', () => {
  it('it should toggle theme', async () => {
    const wrapper = mount(App)
    expect(wrapper.classes()).toContain('my-app-dark')
    await wrapper.findComponent({ name: 'AppHeader' }).find('button').trigger('click')
    expect(wrapper.classes()).toContain('my-app-light')
  })
})
