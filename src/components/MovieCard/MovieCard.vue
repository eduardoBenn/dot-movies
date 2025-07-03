<template>
  <Toast />

  <section
    class="group relative flex w-64 flex-col items-center rounded-lg bg-gray-200 p-4 shadow-md"
  >
    <button
      @click="addToFavorites"
      class="absolute top-3 right-3 text-gray-400"
      data-testid="add-favorites"
    >
      <HeartIcon
        name="HeartIcon"
        class="h-5 w-5 cursor-pointer hover:text-red-400"
        :class="isFavorite ? 'text-red-500' : 'text-red-200'"
      />
    </button>

    <div class="mt-2 mb-2 flex h-20 h-32 items-center justify-center rounded-md bg-gray-300">
      <img
        :src="imagePath"
        :alt="movie.title"
        class="h-full w-full rounded-md object-cover transition group-hover:scale-110"
      />
    </div>

    <div class="mb-2">
      <span class="text-sm text-gray-500">{{ movie.release_date }}</span>
    </div>

    <div class="mb-1 text-center text-lg font-bold text-black">{{ movie.title }}</div>

    <div class="mb-2 flex items-center gap-2">
      <StarIcon class="h-5 w-5 text-yellow-500" />
      <span class="font-bold text-gray-700">{{ String(movie.vote_average).substring(0, 3) }}</span>
    </div>

    <div class="mb-2 flex flex-row gap-2">
      <span
        v-for="genre in movieGenres.slice(0, 3)"
        :key="genre.id"
        data-testid="movie-genre"
        class="text-[12px] text-black"
      >
        {{ genre.name }}
      </span>
    </div>

    <div class="mb-2 font-semibold text-gray-800">{{ formatToCurrencyMoney(movie.price) }}</div>

    <button
      @click="addToShoppingCartItem"
      class="mt-auto w-full cursor-pointer rounded bg-green-500 py-2 font-bold text-white hover:bg-green-600"
    >
      Adicionar
    </button>
  </section>
</template>

<script lang="ts">
  import type { IFavorite } from '@/interfaces/Ifavorite'
  import type { IGenre, IMovie } from '@/interfaces/Imovie'
  import { imageBaseUrl } from '@/services'
  import MoviesService from '@/services/MoviesService'
  import { useStore } from '@/store'
  import { ADD_FAVORITES, SET_SHOPPING_CART_ITEMS } from '@/store/mutationTypes'
  import { formatToCurrencyMoney } from '@/utils/formater.util'
  import { HeartIcon, StarIcon } from '@heroicons/vue/16/solid'
  import { Toast, useToast } from 'primevue'
  // import { useToast } from 'primevue'
  import { computed, defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'MovieCard',
    components: {
      StarIcon,
      HeartIcon,
      Toast,
    },
    props: {
      movieProp: {
        type: Object as () => IMovie,
        required: true,
      },
    },
    setup(props) {
      const store = useStore()
      const imagePath = ref<string>('')
      const toast = useToast()

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

      const addToFavorites = () => {
        store.commit(ADD_FAVORITES, props.movieProp)
      }

      const addToShoppingCartItem = () => {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Adicionado com sucesso!',
          life: 3000,
        })
        store.commit(SET_SHOPPING_CART_ITEMS, props.movieProp)
      }

      const isFavorite = computed(() => {
        const favorites = store.getters.allFavorites
        return favorites.some((favorite: IFavorite) => favorite.id === props.movieProp.id)
      })

      return {
        movie: props.movieProp,
        imagePath,
        movieGenres,
        addToFavorites,
        addToShoppingCartItem,
        isFavorite,
        formatToCurrencyMoney,
      }
    },
  })
</script>
