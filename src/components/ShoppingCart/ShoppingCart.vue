<template>
  <div class="top-0 right-0 flex h-full w-70 flex-col">
    <header class="flex items-center justify-between border-b px-1 py-3">
      <h2 class="text-lg font-semibold">Itens no carrinho</h2>
      <button
        data-testid="clear-items-button"
        class="text-sm text-blue-500 hover:underline"
        @click="clearShoppingItems"
      >
        Esvaziar
      </button>
    </header>

    <div class="flex-1 overflow-y-auto px-6 py-3">
      <div
        class="mb-4 flex items-center justify-between"
        v-for="(item, index) in shoppingCartItems"
        :key="index"
        data-testid="cart-item"
      >
        <div class="flex items-center space-x-3">
          <div>
            <p class="font-small">{{ item.title }}</p>
            <p class="text-sm text-gray-500">{{ index + 1 }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-semibold">R${{ item.price }}</span>
          <TrashIcon class="w-6 cursor-pointer" @click="removeShoppingItem(item.id)" />
        </div>
      </div>
    </div>

    <footer class="border-t px-6 py-4">
      <div class="mb-4 flex items-center justify-between">
        <span>Total:</span>
        <span class="text-lg font-bold">{{ totalPrice }}</span>
      </div>
      <button
        class="w-full cursor-pointer rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
        v-on:click="goToShopping"
        data-testid="finish-purchase"
      >
        Finalizar compra
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
  import { useStore } from '@/store'
  import { CLEAR_SHOPPING_CART_ITEM, REMOVE_SHOPPING_CART_ITEM } from '@/store/mutationTypes'
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

      // const formatValue = (value: number) => {
      //   return new Intl.NumberFormat('pt-BR', {
      //     style: 'currency',
      //     currency: 'BRL',
      //   }).format(value)
      // }

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
      }
    },
  })
</script>

<style scoped></style>
