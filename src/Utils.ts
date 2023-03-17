export const curry = function (fn: Function) {
    return function curried (this: any, ...args1: []) {
        if (fn.length <= args1.length) {
            return fn.apply(this, args1)
        } else {
            return (...args2: []) => {
                return curried.apply(this, [...args1, ...args2])
            }
        }
    }
}
