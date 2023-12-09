<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

const route = useRoute();
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>

<style>
  html {
    background-color: white;
  }
</style>
