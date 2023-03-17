import rules  from "./Rules";

type Task = {
    key: string;
    value: any;
    rules: Function[];
}

type Result = {
    messages: string[];
    isPassed: boolean;
}

type TaskResult = {
    [key: string]: Result;
}

export type ValidationResult = {
    result: TaskResult;
    messages: string[];
    firstMessage: string;
    lastMessage: string;
    isPassed: boolean;
    orFirst: Function;
    orLast: Function;
}

export const FV = (tasks: Task[]): ValidationResult => {
    const data = tasks.map(task => {
        const taskResult = task.rules.map(rule => rule(task.value))
        return {
            key: task.key,
            result: taskResult,
            isPassed: taskResult.every(({ isSuccessValue }) => isSuccessValue),
        }
    })
    const result = Object.fromEntries(data.map(item => [
        item.key,
        {
            messages: item.result
                .filter(result => !result.isSuccessValue)
                .map(({val}) => val),
            isPassed: item.isPassed
        }
    ]))
    const messages = data
        .filter(r => !r.isPassed)
        .map(r => r.result
            .filter(({ isSuccessValue }) => !isSuccessValue)
            .map(({ val }) => val)
        )
        .flat()
    const length = messages.length
    const isPassed = length === 0
    const firstMessage = !isPassed ? messages[0] : ''
    const lastMessage = !isPassed ? messages[length - 1] : ''

    return {
        result,
        messages,
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
