<template>
  <div class="container mx-auto p-2">
    <div class="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <MovieCard v-for="item in shoppingCartItems" :key="item.id" :movieProp="item" />
    </div>
    <ShoppingCart :is-visible="false" />
  </div>
</template>

<script lang="ts">
  import MovieCard from '@/components/MovieCard/MovieCard.vue'
  import { useStore } from '@/store'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'ShoppingView',
    components: {
      MovieCard,
    },
    setup() {
      const store = useStore()

      return {
        shoppingCartItems: computed(() => store.getters.allShoppingCartItems),
      }
    },
  })
</script>
