<script lang="ts" setup>

const qantra = useQantra();
const { query } = useRoute();

if (process.browser) {
  qantra.redirect(query.redirect_uri as string)
}
</script>

<template>
  <div>
    redirecting...
  </div>
</template>
