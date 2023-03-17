export class Result {
    val: any;
    isSuccessValue: boolean;
    constructor(val: any, isSuccessValue: boolean) {
        this.val = val;
        this.isSuccessValue = isSuccessValue;
    }
}

export const Success = function (val: any) {
    return new Result(val, true);
};
export const Fail = function (val: any) {
    return new Result(val, false);
};
