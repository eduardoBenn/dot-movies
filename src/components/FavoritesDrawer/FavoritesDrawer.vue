<template>
  <Drawer v-model:visible="localVisible" header="Favoritos" position="right">
    <FavoritesContainerDrawer />
  </Drawer>
</template>

<script lang="ts">
  import { Drawer } from 'primevue'
  import { defineComponent, ref, watchEffect } from 'vue'
  import FavoritesContainerDrawer from './FavoritesContainerDrawer.vue'

  export default defineComponent({
    name: 'FavoritesDrawer',
    components: {
      Drawer,
      FavoritesContainerDrawer,
    },
    props: {
      favoritesVisible: {
        type: Boolean,
        required: true,
      },
    },
    setup(props) {
      const localVisible = ref(props.favoritesVisible)

      watchEffect(() => {
        localVisible.value = props.favoritesVisible
      })

      return {
        localVisible,
      }
    },
  })
</script>
