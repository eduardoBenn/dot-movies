<template>
  <div class="container mx-auto p-2">
    <div class="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movieProp="movie" />
    </div>
    <ShoppingCart :is-visible="false" />
  </div>
</template>

<script lang="ts">
  import { useStore } from '@/store'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppHome',
    components: {},
    setup() {
      const store = useStore()

      return {
        movies: computed(() => store.getters.allMovies),
      }
    },
  })
</script>
