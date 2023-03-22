import { Result } from './Result';
export declare class ResultList {
    _results: Result[];
    constructor(results: Result[]);
    get isPassed(): boolean;
    toArray(): string[];
    toResult(): Result[];
    getFirst(): string;
    getLast(): string;
}
