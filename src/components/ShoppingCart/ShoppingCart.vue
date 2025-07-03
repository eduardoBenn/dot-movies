<template>
  <div class="top-0 right-0 flex h-full w-70 flex-col">
    <header class="flex items-center justify-between border-b px-1 py-3">
      <h2 class="text-lg font-semibold">Itens no carrinho</h2>
      <button
        data-testid="clear-items-button"
        class="cursor-pointer text-sm text-blue-500 hover:underline"
        @click="clearShoppingItems"
      >
        Esvaziar
      </button>
    </header>

    <div class="flex-1 overflow-y-auto px-6 py-3">
      <div v-if="shoppingCartItems.length === 0">Adicione itens ao seu carrinho</div>

      <div
        class="mb-4 flex items-center justify-between"
        v-for="(item, index) in shoppingCartItems"
        :key="index"
        data-testid="cart-item"
      >
        <div class="flex items-center space-x-3">
          <p class="text-sm text-gray-500">{{ index + 1 }}</p>
          <p class="font-small">{{ item.title }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-semibold">{{ formatToCurrencyMoney(item.price) }}</span>
          <TrashIcon class="w-6 cursor-pointer" @click="removeShoppingItem(item.id)" />
        </div>
      </div>
    </div>

    <footer class="border-t px-6 py-4">
      <div class="mb-4 flex items-center justify-between">
        <span>Total:</span>
        <span class="text-lg font-bold">{{ formatToCurrencyMoney(totalPrice) }}</span>
      </div>
      <button
        class="w-full cursor-pointer rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        v-on:click="goToShopping"
        data-testid="finish-purchase"
        :disabled="shoppingCartItems.length === 0"
      >
        Finalizar compra
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
  import { useStore } from '@/store'
  import { CLEAR_SHOPPING_CART_ITEM, REMOVE_SHOPPING_CART_ITEM } from '@/store/mutationTypes'
  import { formatToCurrencyMoney } from '@/utils/formater.util'
  import { TrashIcon } from '@heroicons/vue/16/solid'
  import { computed, defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'ShoppingView',
    components: {
      TrashIcon,
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const goToShopping = () => {
        router.push('/shopping')
      }

      const clearShoppingItems = () => {
        store.commit(CLEAR_SHOPPING_CART_ITEM)
      }

      const removeShoppingItem = (id: string) => {
        store.commit(REMOVE_SHOPPING_CART_ITEM, id)
      }

      return {
        shoppingCartItems: computed(() => store.getters.allShoppingCartItems),
        totalPrice: computed(() => store.getters.totalPrice),
        goToShopping,
        clearShoppingItems,
        removeShoppingItem,
        formatToCurrencyMoney,
      }
    },
  })
</script>

<style scoped></style>
