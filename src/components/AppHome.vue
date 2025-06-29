<template>
  <div class="container mx-auto p-2">
    <div class="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movieProp="movie" />
    </div>
  </div>
</template>

<script lang="ts">
  import MovieCard from '@/components/MovieCard/MovieCard.vue'
  import { useStore } from '@/store'
  import { GET_GENRES, GET_MOVIES } from '@/store/mutationTypes'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppHome',
    components: {
      MovieCard,
    },
    setup() {
      const store = useStore()
      store.dispatch(GET_GENRES)
      store.dispatch(GET_MOVIES)

      return {
        movies: computed(() => store.getters.allMovies),
      }
    },
  })
</script>

<style scoped></style>
