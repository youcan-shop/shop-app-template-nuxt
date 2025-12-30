<script lang="ts" setup>
import { Sonner } from '@youcan/celeste'
</script>

<template>
  <div>
    <Sonner />
    <slot />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font: var(--paragraph-sm);
}
</style>
