<template>
  <Drawer v-model:visible="localVisible" header="Meu carrinho" position="right">
    <ShoppingCart v-if="localVisible" />
  </Drawer>
</template>

<script lang="ts">
  import { Drawer } from 'primevue'
  import { defineComponent, ref, watchEffect } from 'vue'
  import ShoppingCart from '../ShoppingCart/ShoppingCart.vue'

  export default defineComponent({
    name: 'ShoppingCartDrawer',
    components: {
      Drawer,
      ShoppingCart,
    },
    props: {
      shoppingCartVisible: {
        type: Boolean,
        required: true,
      },
    },
    setup(props) {
      const localVisible = ref(props.shoppingCartVisible)

      watchEffect(() => {
        localVisible.value = props.shoppingCartVisible
      })

      return {
        localVisible,
      }
    },
  })
</script>
