<template>
  <header class="flex items-center justify-between bg-teal-700 px-6 py-4 text-cyan-50">
    <div @click="goToHome" class="cursor-pointer">Home</div>
    <div>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="search"
          placeholder="Search"
          class="!bg-white !text-black dark:!bg-gray-800 dark:!text-white"
        />
      </IconField>
    </div>
    <div class="flex items-center gap-8">
      <div class="flex items-center">
        <ShoppingCartIcon class="w-6 cursor-pointer" @click="goToShoppingCart" />
      </div>
      <div class="flex items-center">
        <HeartIcon class="w-6 cursor-pointer" @click="goToFavorites" />
      </div>
      <div class="flex items-center gap-1">
        <MoonIcon v-if="isDark" class="w-5" />
        <SunIcon v-else class="w-5" />
        <ToggleSwitch @value-change="toggleTheme" v-model="themeLight" />
      </div>
    </div>
  </header>

  <!-- mover p/ component separado -->
  <Drawer v-model:visible="favoritesVisible" header="Right Drawer" position="right">
    <p>favoritos</p>
  </Drawer>
</template>

<script lang="ts">
  import { HeartIcon, MoonIcon, ShoppingCartIcon, SunIcon } from '@heroicons/vue/16/solid'
  import { Drawer, IconField, InputIcon, InputText, ToggleSwitch } from 'primevue'
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'AppHeader',
    components: {
      IconField,
      InputIcon,
      InputText,
      ToggleSwitch,
      ShoppingCartIcon,
      HeartIcon,
      SunIcon,
      MoonIcon,
      Drawer,
    },
    props: {
      isDark: {
        type: Boolean,
        required: true,
      },
    },
    setup(props, { emit }) {
      const search = ref('')
      const cartVisible = ref(false)
      const favoritesVisible = ref(false)
      const themeLight = ref(!props.isDark)
      const toggleTheme = () => emit('toggle-theme')
      const router = useRouter()

      const goToFavorites = () => {
        router.push('/favorites')
      }

      const goToShoppingCart = () => {
        router.push('/shopping')
      }

      const goToHome = () => {
        router.push('/')
      }

      return {
        search,
        cartVisible,
        favoritesVisible,
        themeLight,
        toggleTheme,
        goToFavorites,
        goToShoppingCart,
        goToHome,
      }
    },
  })
</script>
