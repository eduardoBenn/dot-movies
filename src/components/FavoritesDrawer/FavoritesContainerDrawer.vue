<template>
  <div class="mx-auto max-w-md overflow-hidden rounded-lg shadow">
    <div class="flex items-center justify-between border-b px-4 py-3">
      <h2 class="text-lg font-semibold">Meu itens</h2>
      <button class="cursor-pointer text-sm text-blue-500 hover:underline" @click="clearFavorites">
        Esvaziar
      </button>
    </div>

    <ul>
      <li
        class="flex items-center justify-between border-b px-4 py-3 last:border-0"
        v-for="(favorite, index) in allFavorites"
        :key="index"
      >
        <div class="flex items-center">
          <!-- <div class="mr-4 flex h-12 w-12 items-center justify-center rounded">img do filme</div> -->
          <div>
            <p class="text-[12]">{{ favorite.title }}</p>
            <p class="text-[10]">{{ formatToCurrencyMoney(favorite.price) }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <PrimeVueButton
            class="cursor-pointer"
            icon="pi pi-shopping-cart"
            aria-label="Adicionar ao carrinho"
            title="Adicionar ao carrinho"
            severity="success"
            variant="text"
            rounded
          />

          <PrimeVueButton
            icon="pi pi-trash"
            severity="danger"
            variant="text"
            rounded
            class="cursor-pointer"
            aria-label="Remover dos favoritos"
            title="Remover dos favoritos"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { useStore } from '@/store'
  import { CLEAR_FAVORITES } from '@/store/mutationTypes'
  import { formatToCurrencyMoney } from '@/utils/formater.util'
  import { Button as PrimeVueButton } from 'primevue'

  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'ShoppingView',
    setup() {
      const store = useStore()

      const clearFavorites = () => {
        store.commit(CLEAR_FAVORITES)
      }

      return {
        allFavorites: computed(() => store.getters.allFavorites),
        formatToCurrencyMoney,
        clearFavorites,
      }
    },
    components: {
      PrimeVueButton,
    },
  })
</script>
