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
                    @change="validateAndSave(account.id)"
                    class="form__field"
                    placeholder="Выберите тип"
                    v-model:value="formValue.type"
                    :options="options"
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
                v-if="formValue.type === 'Локальная'"
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
                @positive-click="store.deleteAccount(account.id)"
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
import type { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";
import IconDeleteBig from "../icons/IconDeleteBig.vue";
import type { AccountType, IAccount } from "../types/account";
import { useAccountsStore } from "../store/accounts";

const formRef = ref<FormInst | null>(null);
const store = useAccountsStore();

const { account } = defineProps<{ account: IAccount }>();

type FormModel = {
    label: string;
    type: AccountType;
    login: string;
    password: string | null;
};

const formValue = ref<FormModel>({
    label: account?.label || "",
    type: account?.type || "LDAP",
    login: account?.login || "",
    password: account?.password || "",
});

function validateAndSave(id: string) {
    if (!formRef.value) return;

    formRef.value.validate((errors) => {
        if (!errors) {
            const model = formValue.value;
            store.updatItem(id, {
                id: account.id,
                label: model.label,
                type: model.type,
                login: model.login,
                password: model.type === "LDAP" ? null : model.password,
            });
        }
    });
}

const options = [
    {
        label: "LDAP ",
        value: "LDAP ",
    },
    {
        label: "Локальная",
        value: "Локальная",
    },
];

const rules: FormRules = {
    label: [
        {
            max: 100,
            required: false,
            trigger: ["blur"],
        },
    ],
    type: [
        {
            required: true,
            message: "Выберите тип",
            trigger: ["blur", "change"],
        },
    ],
    login: [
        {
            max: 100,
            required: true,
            message: "",
            trigger: ["blur"],
        },
    ],
    password: [
        {
            max: 100,
            required: false,
            validator: (rule, value) => {
                if (formValue.value.type === "Локальная" && !value) {
                    return new Error("");
                }
                return true;
            },
            trigger: ["blur"],
        },
    ],
};

const rulesRef = ref<FormRules>(rules);
</script>

<style scoped lang="scss">
.form {
    display: grid;
    grid-template-columns: 1fr 140px 1fr 1fr 80px;
    gap: 12px;
    padding: 12px 16px;
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
