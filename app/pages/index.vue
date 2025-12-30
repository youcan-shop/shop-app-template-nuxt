<script setup lang="ts">
const { data: store } = await useApi('/api/store');
</script>

<template>
  <div>
    <h1>Hello</h1>
    {{ store }}
  </div>
</template>
