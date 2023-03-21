import rules  from "./Rules"
import validator from './Validator'
import { Result } from './Result'

export type ValidationResult = {
    messages: string[];
    firstMessage: string;
    lastMessage: string;
    isPassed: boolean;
    orFirst: Function;
    orLast: Function;
}

export const F = (tasks: Result[][]): ValidationResult => {
    const result: Result[] = tasks.flatMap(task => task)
    const failed = result.filter(r => !r.isSuccessValue)
    const firstMessage = failed.length > 0 ? failed[0].val : ''
    const lastMessage = failed.length > 0 ? failed[failed.length - 1].val : ''
    const isPassed = failed.length === 0

    return {
        messages: failed.map(r => r.val),
        firstMessage,
        lastMessage,
        isPassed,
        orFirst: (onPassed: Function, onFailed: Function) => {
            return isPassed
                ? onPassed()
                : onFailed(firstMessage)
        },
        orLast: (onPassed: Function, onFailed: Function) => {
            return isPassed
                ? onPassed()
                : onFailed(lastMessage)
        },
    }
}

export const r = rules
export const v = validator;

