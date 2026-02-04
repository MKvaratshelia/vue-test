<template>
    <header class="header">
        <h1 class="header__title">Учетные записи</h1>

        <NButton
            @click="store.addAccount"
            class="header__button"
            type="default"
        >
            <IconPlus />
        </NButton>
    </header>
</template>
<script setup lang="ts">
import { NButton } from "naive-ui";
import IconPlus from "../icons/IconPlus.vue";
import { useAccountsStore } from "../store/accounts";
const store = useAccountsStore();
</script>
<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    font-size: 25px;
    gap: 20px;

    &__title {
        margin: 0;
        font-size: 24px;
    }
}
</style>
