<script setup lang="ts">
const { data: orders } = await useApi('/api/products');
</script>

<template>
  <div>
    <h1>Orders</h1>
    <pre>{{ orders?.id }}</pre>
  </div>
</template>
