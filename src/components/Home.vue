<template>
  <div>home</div>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'
  import { RouterLink } from 'vue-router'
  import Header from './Header/Header.vue'

  defineComponent({
    name: 'HomeView',
  })
</script>

<style scoped></style>
