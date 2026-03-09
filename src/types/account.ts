export type AccountType = "Локальная" | "LDAP";
export interface IAccount {
    id: string;
    label: string;
    type: AccountType;
    login: string;
    password: string | null;
}

export type LabelItem = {
    text: string;
};

export interface IAccountStored {
    id: string;
    labels: LabelItem[];
    type: AccountType;
    login: string;
    password: string | null;
}

export type FormModel = {
    label: string;
    type: AccountType;
    login: string;
    password: string | null;
};
