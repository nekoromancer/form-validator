import { Result } from './Result'

export class ResultList {
    public _results: Result[] = []

    constructor(results: Result[]) {
        this._results = results
    }

    get isPassed(): boolean {
        return this._results.every(r => r.isSuccessValue)
    }

    toArray(): string[] {
        return this._results
            .filter(r => !r.isSuccessValue)
            .map(r => r.val)
    }

    toResult(): Result[] {
        return this._results.filter(r => !r.isSuccessValue)
    }

    getFirst(): string {
        return this.isPassed ? '' : this._results[0].val
    }

    getLast(): string {
        return this.isPassed ? '' : this._results[this._results.length - 1].val
    }
}
