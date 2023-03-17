export declare class Result {
    val: any;
    isSuccessValue: boolean;
    constructor(val: any, isSuccessValue: boolean);
}
export declare const Success: (val: any) => Result;
export declare const Fail: (val: any) => Result;
