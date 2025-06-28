<template>
  <header class="flex items-center justify-between bg-teal-700 px-6 py-4 text-cyan-50">
    <div>logo</div>
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
    <div>
      <button @click="onToggleTheme">{{ isDark ? 'Light' : 'Dark' }} Mode</button>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { IconField, InputIcon, InputText } from 'primevue'
  import { ref } from 'vue'

  const search = ref('')

  defineProps<{ onToggleTheme: () => void; isDark: boolean }>()
</script>
