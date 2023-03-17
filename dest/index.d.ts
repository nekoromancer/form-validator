declare type Task = {
    key: string;
    value: any;
    rules: Function[];
};
declare type Result = {
    messages: string[];
    isPassed: boolean;
};
declare type TaskResult = {
    [key: string]: Result;
};
export declare type ValidationResult = {
    result: TaskResult;
    messages: string[];
    firstMessage: string;
    lastMessage: string;
    isPassed: boolean;
    orFirst: Function;
    orLast: Function;
};
export declare const FV: (tasks: Task[]) => ValidationResult;
export declare const r: {
    required: (this: any) => any;
    email: (this: any) => any;
    url: (this: any) => any;
    cellphone: (this: any) => any;
    minLength: (this: any) => any;
    maxLength: (this: any) => any;
    gte: (this: any) => any;
    lte: (this: any) => any;
    gt: (this: any) => any;
    lt: (this: any) => any;
    regex: (this: any) => any;
    numeric: (this: any) => any;
    alphaNumeric: (this: any) => any;
    same: (this: any) => any;
    diff: (this: any) => any;
    custom: (this: any) => any;
};
export {};
