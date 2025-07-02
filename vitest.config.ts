import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [
        ...configDefaults.exclude,
        'e2e/**',
        'src/main.ts',
        'src/assets/**',
        'src/router/**',
        'src/services/**',
        'dist/**',
        'coverage/**',
        'playwright.config.ts',
        'node_modules/**',
        'public/**',
        '**/*.d.ts',
      ],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        reporter: ['html', 'text'],
        exclude: [
          ...configDefaults.exclude,
          'src/main.ts',
          'src/interfaces/**',
          'src/assets/**',
          'src/services/**',
          'src/router/**',
          'dist/**',
          'coverage/**',
          'playwright.config.ts',
          'node_modules/**',
          'public/**',
          '**/*.d.ts',
        ],
      },
    },
  })
)
