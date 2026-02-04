import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import type { IAccount, IAccountStored, LabelItem } from "../types/account";
import { ref, watch } from "vue";

const STORAGE_ACCOUNTS_KEY = "accounts";

function convertLabels(labelStr: string): LabelItem[] {
    if (!labelStr.trim()) return [];
    return labelStr
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((text) => ({ text }));
}

function labelsToString(labels: LabelItem[]): string {
    return labels.map((l) => l.text).join("; ");
}

function loadFromStorage(): IAccount[] {
    try {
        const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
        if (!raw) return [];
        const stored: IAccountStored[] = JSON.parse(raw);
        return stored.map((s) => ({
            id: s.id,
            label: labelsToString(s.labels),
            type: s.type,
            login: s.login,
            password: s.password,
        }));
    } catch {
        return [];
    }
}

function toStored(account: IAccount): IAccountStored {
    return {
        id: account.id,
        labels: convertLabels(account.label),
        type: account.type,
        login: account.login,
        password: account.password,
    };
}

export const useAccountsStore = defineStore("accounts", () => {
    const items = ref<IAccount[]>(loadFromStorage());

    watch(
        items,
        (newItems) => {
            localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(newItems.map(toStored)));
        },
        { deep: true },
    );

    const addAccount = () => {
        const account: IAccount = {
            id: uuidv4(),
            label: "",
            type: "LDAP",
            login: "",
            password: null,
        };

        items.value = [...items.value, account];
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

    return {
        items,
        addAccount,
        deleteAccount,
        updatItem,
    };
});
