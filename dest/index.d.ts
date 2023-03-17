type Task = {
    key: string;
    value: any;
    rules: Function[];
};
type Result = {
    messages: string[];
    isPassed: boolean;
};
type TaskResult = {
    [key: string]: Result;
};
export type ValidationResult = {
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
    required: any;
    email: any;
    url: any;
    cellphone: any;
    minLength: any;
    maxLength: any;
    gte: any;
    lte: any;
    gt: any;
    lt: any;
    regex: any;
    numeric: any;
    alphaNumeric: any;
    same: any;
    diff: any;
    custom: any;
};
export {};
