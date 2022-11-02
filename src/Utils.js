export const curry = function (fn) {
    return function curried (...args1) {
        if (fn.length <= args1.length) {
            return fn.apply(this, args1)
        } else {
            return function (...args2) {
                return curried.apply(this, [...args1, ...args2])
            }
        }
    }
}
