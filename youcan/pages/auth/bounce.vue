<script lang="ts" setup>
const qantra = useQantra();
const { query } = useRoute();

if (process.browser) {
    qantra.bounce(query.to as string)
}
</script>

<template>
    <div>
        bouncing...
    </div>
</template>
