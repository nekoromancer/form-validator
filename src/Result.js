const Result = {}

Result.__proto__ = {
    init: function (val, isSuccessValue) {
        this.val = val
        this.isSuccessValue = isSuccessValue
    },
}

export const Success = function (val) {
    return new Result.init(val, true)
}
export const Fail = function (val) {
    return new Result.init(val, false)
}
