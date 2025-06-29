<template>
  <Drawer v-model:visible="$props.isVisible" header="Right Drawer" position="right">
    <p>carrinho</p>
  </Drawer>
</template>

<script lang="ts">
  import { Drawer } from 'primevue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ShoppingCart',
    components: {
      Drawer,
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    setup() {},
  })
</script>
