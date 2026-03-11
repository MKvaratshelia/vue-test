import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import type { IAccount } from "../types/account";
import { ref, watch } from "vue";
import { useAccountsStorage } from "../hooks/useAccountsStorage";
import { AccountType } from "../constants/account";

export const useAccountsStore = defineStore("accounts", () => {
    const storage = useAccountsStorage();
    const items = ref<IAccount[]>(storage.load());

    watch(items, (newItems) => storage.save(newItems), { deep: true });

    const addAccount = () => {
        items.value = [
            ...items.value,
            {
                id: uuidv4(),
                label: "",
                type: AccountType.LDAP,
                login: "",
                password: null,
            },
        ];
    };
    const deleteAccount = (id: string) => {
        items.value = items.value.filter((acc) => acc.id !== id);
    };

    const updatItem = (id: string, newValues: IAccount) => {
        const index = items.value.findIndex((item) => item.id === id);
        if (index === -1) return;

        const newArray = [...items.value];
        newArray[index] = { ...newValues };
        items.value = newArray;
    };

    return { items, addAccount, deleteAccount, updatItem };
});
