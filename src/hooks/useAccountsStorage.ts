import type { IAccount, IAccountStored, LabelItem } from "../types/account";

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

function toStored(account: IAccount): IAccountStored {
    return {
        id: account.id,
        labels: convertLabels(account.label),
        type: account.type,
        login: account.login,
        password: account.password,
    };
}

export function useAccountsStorage() {
    const load = (): IAccount[] => {
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
    };

    const save = (accounts: IAccount[]): void => {
        localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts.map(toStored)));
    };

    return { load, save };
}
