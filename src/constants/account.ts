export const AccountType = {
    LDAP: "LDAP",
    LOCAL: "Локальная",
} as const;

export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export const ACCOUNT_TYPE_OPTIONS = [
    {
        label: "LDAP",
        value: AccountType.LDAP,
    },
    {
        label: "Локальная",
        value: AccountType.LOCAL,
    },
];
