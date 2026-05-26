<template>
    <NForm
        ref="formRef"
        :model="formValue"
        :rules="rulesRef"
    >
        <div class="form">
            <NFormItem
                :show-label="false"
                :path="`label`"
            >
                <NInput
                    title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
                    class="form__field"
                    v-model:value="formValue.label"
                    placeholder="метки"
                    @blur="validateAndSave(account.id)"
                    maxlength="100"
                />
            </NFormItem>
            <NFormItem
                :show-label="false"
                :path="`type`"
            >
                <NSelect
                    @update:value="validateAndSave(account.id)"
                    class="form__field"
                    placeholder="Выберите тип"
                    v-model:value="formValue.type"
                    :options="ACCOUNT_TYPE_OPTIONS"
                />
            </NFormItem>
            <NFormItem
                :show-label="false"
                :path="`login`"
            >
                <NInput
                    @blur="validateAndSave(account.id)"
                    class="form__field"
                    v-model:value="formValue.login"
                    placeholder="логин"
                    maxlength="100"
                />
            </NFormItem>
            <NFormItem
                :show-label="false"
                v-if="formValue.type === AccountType.LOCAL"
                :path="`password`"
            >
                <NInput
                    @blur="validateAndSave(account.id)"
                    show-password-on="click"
                    type="password"
                    class="form__field"
                    v-model:value="formValue.password"
                    placeholder="пароль"
                    maxlength="100"
                />
            </NFormItem>
            <div v-else></div>
            <NPopconfirm
                positive-text="Удалить"
                negative-text="Отмена"
                @positive-click="deleteAccount"
            >
                <template #trigger>
                    <NButton>
                        <IconDeleteBig />
                    </NButton>
                </template>
                Удалить?
            </NPopconfirm>
        </div>
    </NForm>
</template>
<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NSelect, NPopconfirm } from "naive-ui";
import IconDeleteBig from "../../icons/IconDeleteBig.vue";
import type { IAccount } from "../../types/account";
import { useAccountForm } from "../../hooks/useAccountForm";
import { AccountType, ACCOUNT_TYPE_OPTIONS } from "../../constants/account";

const { account } = defineProps<{ account: IAccount }>();

const { formRef, formValue, rulesRef, validateAndSave, deleteAccount } = useAccountForm(account);
void formRef;
</script>
<style scoped lang="scss">
.form {
    display: grid;
    grid-template-columns: var(--table-grid-template, 1fr 140px 1fr 1fr 80px);
    gap: var(--table-gap, 12px);
    padding: var(--table-padding, 12px 16px);
    align-items: start;
    border-top: 1px solid black;
}

.form:deep(.n-form-item) {
    margin-bottom: 0;
}

.form:deep(.n-form-item .n-form-item-blank) {
    width: 100%;
}
</style>
