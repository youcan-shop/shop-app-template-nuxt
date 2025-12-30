<script setup lang="ts">
const { data: session } = await useFetch('/auth/session')
</script>

<template>
  <div>
    <h1>slm</h1>
    {{ session }}
  </div>
</template>
