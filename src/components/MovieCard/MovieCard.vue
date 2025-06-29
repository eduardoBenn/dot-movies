<template>
  <div class="relative flex w-64 flex-col items-center rounded-lg bg-gray-100 p-4 shadow-md">
    <button class="absolute top-3 right-3 text-gray-400 hover:text-red-400">
      <!-- <IconHeart /> -->
    </button>

    <div class="mt-2 mb-2 flex h-20 w-20 items-center justify-center rounded-md bg-gray-300">
      <img :src="imagePath" :alt="movie.title" class="h-full w-full rounded-md object-cover" />
    </div>

    <span class="mb-2 text-sm text-gray-500">7 de Janeiro, 2019</span>

    <div class="text:black mb-1 text-center text-lg font-bold text-black">{{ movie.title }}</div>

    <div class="mb-2 flex items-center gap-2">
      <span class="font-bold text-gray-700">7</span>
    </div>

    <div class="mb-2 font-semibold text-gray-800">R$ 79,99</div>

    <button
      class="mt-auto w-full cursor-pointer rounded bg-indigo-500 py-2 font-bold text-white hover:bg-indigo-600"
    >
      Adicionar
    </button>

    <li v-for="genre in movieGenres" :key="genre.id" class="rounded bg-gray-200 px-2 py-1">
      {{ genre.name }}
    </li>
  </div>
</template>

<script lang="ts">
  import type { IGenre, IMovie } from '@/interfaces/Imovie'
  import { imageBaseUrl } from '@/services'
  import MoviesService from '@/services/MoviesService'
  import { useStore } from '@/store'
  import { computed, defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'MovieCard',
    props: {
      movieProp: {
        type: Object as () => IMovie,
        required: true,
      },
    },
    setup(props) {
      const store = useStore()
      const imagePath = ref<string>('')

      MoviesService.getMoviesImages(props.movieProp.id)
        .then((image) => {
          if (image.posters[0]) {
            imagePath.value = imageBaseUrl + image.posters[0].file_path
          }
        })
        .catch((error) => {
          console.error('Error fetching movie image:', error)
        })

      const movieGenres = computed(() => {
        const allGenres = store.getters.allGenres
        return allGenres.filter((genre: IGenre) => props.movieProp.genre_ids?.includes(genre.id))
      })

      return {
        movie: props.movieProp,
        imagePath,
        movieGenres,
      }
    },
  })
</script>
