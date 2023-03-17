/// <reference types="lodash" />
declare const rules: {
    required: import("lodash").CurriedFunction1<string, (value: any) => import("./Result").Result>;
    email: import("lodash").CurriedFunction1<string, (value: string) => import("./Result").Result>;
    url: import("lodash").CurriedFunction1<string, (value: string) => import("./Result").Result>;
    cellphone: import("lodash").CurriedFunction1<string, (value: string) => import("./Result").Result>;
    minLength: import("lodash").CurriedFunction1<number, (message: string) => (value: string) => import("./Result").Result>;
    maxLength: import("lodash").CurriedFunction1<number, (message: string) => (value: string) => import("./Result").Result>;
    gte: import("lodash").CurriedFunction1<number, (message: string) => (value: number) => import("./Result").Result>;
    lte: import("lodash").CurriedFunction1<number, (message: string) => (value: number) => import("./Result").Result>;
    gt: import("lodash").CurriedFunction1<number, (message: string) => (value: number) => import("./Result").Result>;
    lt: import("lodash").CurriedFunction1<number, (message: string) => (value: number) => import("./Result").Result>;
    regex: import("lodash").CurriedFunction1<RegExp, (message: string) => (value: any) => import("./Result").Result>;
    numeric: import("lodash").CurriedFunction1<string, (value: number | string) => import("./Result").Result>;
    alphaNumeric: import("lodash").CurriedFunction1<string, (value: string) => import("./Result").Result>;
    same: import("lodash").CurriedFunction1<string, (value?: never[]) => import("./Result").Result>;
    diff: import("lodash").CurriedFunction1<string, (value?: never[]) => import("./Result").Result>;
    custom: import("lodash").CurriedFunction1<Function, (message: string) => (value: any) => import("./Result").Result>;
};
export default rules;
