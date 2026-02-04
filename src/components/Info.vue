<template>
    <NAlert
        type="info"
        :bordered="false"
        show-icon
    >
        {{ text }}
    </NAlert>
</template>
<script setup lang="ts">
const { text } = defineProps<{ text: string }>();
</script>
<style scoped lang="scss"></style>
