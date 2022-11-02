import rules  from "./Rules.js";

export const FV = tasks => {
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
                .map(({ val }) => val),
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
        orFirst: (onPassed, onFailed) => {
            return isPassed
                ? onPassed()
                : onFailed(firstMessage)
        },
        orLast: (onPassed, onFailed) => {
            return isPassed
                ? onPassed()
                : onFailed(lastMessage)
        },
    }
}

export const r = rules
