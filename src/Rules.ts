import { Success, Fail } from './Result'
import { curry } from './Utils'

const rules = {
    required: curry((message: string) => (value: any) => value !== null
    && typeof value !== 'undefined'
    && !(typeof value === 'string' && value.trim().length === 0)
        ? Success(value)
        : Fail(message)),
    email: curry((message: string) => (value: string) => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value)
        ? Success(value)
        : Fail(message)),
    url: curry((message: string) => (value: string) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value)
        ? Success(value)
        : Fail(message)),
    cellphone: curry((message: string) => (value: string) => /^01\d[-\s]*\d{3,4}[-\s]*\d{4}$/.test(value)
        ? Success(value)
        : Fail(message)),
    minLength: curry((length: number) => (message: string) => (value: string) => value.trim().length >= length
        ? Success(value)
        : Fail(message)),
    maxLength: curry((length: number) => (message: string) => (value: string) => value.trim().length <= length
        ? Success(value)
        : Fail(message)),
    gte: curry((gte: number) => (message: string) => (value: number) => value >= gte ? Success(value) : Fail(message)),
    lte: curry((lte: number) => (message: string) => (value: number) => value <= lte ? Success(value) : Fail(message)),
    gt: curry((gt: number) => (message: string) => (value: number) => value > gt ? Success(value) : Fail(message)),
    lt: curry((lt: number) => (message: string) => (value: number) => value < lt ? Success(value) : Fail(message)),
    regex: curry((regex: RegExp) => (message: string) => (value: any) => regex.test(value) ? Success(value) : Fail(message)),
    numeric: curry((message: string) => (value: number | string) => typeof value === 'number' || /^\d+$/.test(value) ? Success(value) : Fail(message)),
    alphaNumeric: curry((message: string) => (value: string) => /^[\da-zA-Z]+$/.test(value) ? Success(value) : Fail(message)),
    same: curry((message: string) => (value = []) => {
        const [item, ...rest] = value
        return rest.every(each => each === item)
            ? Success(value)
            : Fail(message)
    }),
    diff: curry((message: string) => (value = []) => [...new Set(value)].length === value.length
        ? Success(value)
        : Fail(message)),
    custom: curry((predicate: Function) => (message: string) => (value: any) => predicate(value) ? Success(value) : Fail(message)),
}

export default rules
