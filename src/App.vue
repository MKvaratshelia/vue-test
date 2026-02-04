<template>
    <div class="main">
        <Header />
        <Info text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;" />
        <Accounts />
    </div>
</template>
<script setup lang="ts">
import Header from "./components/Header.vue";
import Info from "./components/Info.vue";
import Accounts from "./components/Accounts.vue";
</script>

<style scoped lang="scss">
.main {
    display: flex;
    min-width: 1200px;
    flex-direction: column;
    padding: 20px;
}
</style>
