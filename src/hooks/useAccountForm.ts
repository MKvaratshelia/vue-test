import { ref, computed } from "vue";
import type { FormInst } from "naive-ui";
import type { IAccount, FormModel } from "../types/account";
import { useAccountsStore } from "../store/accounts";
import { createAccountRules } from "../components/AccountForm/accountValidators";
import { AccountType } from "../constants/account";

export function useAccountForm(account: IAccount) {
    const store = useAccountsStore();
    const formRef = ref<FormInst | null>(null);

    const formValue = ref<FormModel>({
        label: account?.label || "",
        type: account?.type || AccountType.LDAP,
        login: account?.login || "",
        password: account?.password || "",
    });

    const rulesRef = computed(() => createAccountRules(formValue));

    const validateAndSave = (id: string) => {
        if (!formRef.value) return;

        formRef.value.validate((errors) => {
            if (!errors) {
                const model = formValue.value;
                store.updatItem(id, {
                    id: account.id,
                    label: model.label,
                    type: model.type,
                    login: model.login,
                    password: model.type === AccountType.LDAP ? null : model.password,
                });
            }
        });
    };

    const deleteAccount = () => {
        store.deleteAccount(account.id);
    };

    return {
        formRef,
        formValue,
        rulesRef,
        validateAndSave,
        deleteAccount,
    };
}
