<template>
    <div class="accounts-table">
        <header class="table-header">
            <span class="col-label">Метка</span>
            <span class="col-type">Тип записи</span>
            <span class="col-login">Логин <span>*</span></span>
            <span class="col-password">Пароль <span>*</span></span>
            <span class="col-actions" />
        </header>
        <p
            v-if="store.items.length === 0"
            class="empty"
        >
            Пусто
        </p>
        <AccountForm
            v-else
            v-for="acc in store.items"
            :key="acc.id"
            :account="acc"
        />
    </div>
</template>
<script setup lang="ts">
import { useAccountsStore } from "../store/accounts";
import AccountForm from "./AccountForm/AccountForm.vue";
const store = useAccountsStore();
</script>

<style scoped lang="scss">
.accounts-table {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--n-border-color, #e0e0e0);
    border-radius: 8px;
    overflow: hidden;
}

.table-header {
    display: grid;
    grid-template-columns: 1fr 140px 1fr 1fr 80px;
    gap: 12px;
    padding: 12px 16px;
    background: #f7f8fa;
    font-size: 0.875rem;
    font-weight: 500;
    color: #333;
    align-items: center;
}

.table-row {
    display: grid;
    grid-template-columns: 1fr 140px 1fr 1fr 80px;
    gap: 12px;
    padding: 12px 16px;
    align-items: start;
    border-top: 1px solid black;
}

.table-row:deep(.n-form-item) {
    margin-bottom: 0;
}

.table-row:deep(.n-form-item .n-form-item-blank) {
    width: 100%;
}
</style>
