<script setup lang="ts">
const qantra = useQantra();

definePageMeta({
  layout: 'default'
});

const route = useRoute();

const { data: store } = qantra.fetch('/store');
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    {{ store }}
  </div>
</template>

<style>
html {
  background-color: white;
}
</style>