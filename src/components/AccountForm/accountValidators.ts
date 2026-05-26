import type { FormRules } from "naive-ui";
import type { Ref } from "vue";
import type { FormModel } from "../../types/account";

import { AccountType } from "../../constants/account";

export function createAccountRules(formValue: Ref<FormModel>): FormRules {
    return {
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
                    console.log(rule);
                    if (formValue.value.type === AccountType.LOCAL && !value) {
                        return new Error("");
                    }
                    return true;
                },
                trigger: ["blur"],
            },
        ],
    };
}
