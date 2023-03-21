declare const rules: {
    required: (message: string) => (value: any) => import("./Result").Result;
    email: (message: string) => (value: string) => import("./Result").Result;
    url: (message: string) => (value: string) => import("./Result").Result;
    cellphone: (message: string) => (value: string) => import("./Result").Result;
    minLength: (length: number) => (message: string) => (value: string) => import("./Result").Result;
    maxLength: (length: number) => (message: string) => (value: string) => import("./Result").Result;
    gte: (gte: number) => (message: string) => (value: number) => import("./Result").Result;
    lte: (lte: number) => (message: string) => (value: number) => import("./Result").Result;
    gt: (gt: number) => (message: string) => (value: number) => import("./Result").Result;
    lt: (lt: number) => (message: string) => (value: number) => import("./Result").Result;
    regex: (regex: RegExp) => (message: string) => (value: any) => import("./Result").Result;
    numeric: (message: string) => (value: number | string) => import("./Result").Result;
    alphaNumeric: (message: string) => (value: string) => import("./Result").Result;
    same: (message: string) => (value?: never[]) => import("./Result").Result;
    diff: (message: string) => (value?: never[]) => import("./Result").Result;
    custom: (predicate: Function) => (message: string) => (value: any) => import("./Result").Result;
};
export default rules;
