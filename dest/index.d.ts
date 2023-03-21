import { Result } from './Result';
export type ValidationResult = {
    messages: string[];
    firstMessage: string;
    lastMessage: string;
    isPassed: boolean;
    orFirst: Function;
    orLast: Function;
};
export declare const F: (tasks: Result[][]) => ValidationResult;
export declare const r: {
    required: (message: string) => (value: any) => Result;
    email: (message: string) => (value: string) => Result;
    url: (message: string) => (value: string) => Result;
    cellphone: (message: string) => (value: string) => Result;
    minLength: (length: number) => (message: string) => (value: string) => Result;
    maxLength: (length: number) => (message: string) => (value: string) => Result;
    gte: (gte: number) => (message: string) => (value: number) => Result;
    lte: (lte: number) => (message: string) => (value: number) => Result;
    gt: (gt: number) => (message: string) => (value: number) => Result;
    lt: (lt: number) => (message: string) => (value: number) => Result;
    regex: (regex: RegExp) => (message: string) => (value: any) => Result;
    numeric: (message: string) => (value: string | number) => Result;
    alphaNumeric: (message: string) => (value: string) => Result;
    same: (message: string) => (value?: never[]) => Result;
    diff: (message: string) => (value?: never[]) => Result;
    custom: (predicate: Function) => (message: string) => (value: any) => Result;
};
export declare const v: (value: any, ...rules: Function[]) => Result[];
