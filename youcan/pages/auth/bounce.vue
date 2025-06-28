<script lang="ts" setup>
const qantra = useQantra();
const { query } = useRoute();

if (import.meta.browser) {
  qantra.bounce(query.to as string);
}
</script>

<template>
  <div />
</template>
