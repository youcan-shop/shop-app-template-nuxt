<script lang="ts" setup>
import { Sonner } from '@youcan/celeste';
</script>

<template>
  <div class="p-4 bg-bg-weak-50 min-h-svh">
    <Sonner />
    <div class="mx-auto container gap-6 grid grid-cols-1 lg:grid-cols-12">
      <slot />
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizelegibility;
  font-synthesis: none;
}

html,
body {
  margin: 0;
  padding: 0;
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
}
</style>
