import {FV, r} from "../src/index.js";
import pkg from 'chai/index.js';
const { expect } = pkg;

describe('Validation rules test', () => {
    const getResult = ({ val, isSuccessValue }) => ({ val, result: isSuccessValue })

    it('Rule: required', () => {
        const message = '필드는 필수항목 입니다'
        const success = getResult(r.required(message)('Some value'))
        const failed = getResult(r.required(message)(null))

        expect(success.result).to.eq(true)
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })

    it('Rule: email', () => {
        const message = '잘못된 형식의 이메일'
        const success = getResult(r.email(message)('cs@krafton.com'))
        const failed = getResult(r.email(message)('cs-krafton-com'))

        expect(success.result).to.eq(true)
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })

    it('Rule: maxLength, minLength', () => {
        const minMessage = '4글자 이상 입력해 주세요'
        const maxMessage = '최대 12글자 입니다'
        const minLength4 = r.minLength(4)(minMessage)
        const maxLength12 = r.maxLength(12)(maxMessage)
        const successMin = getResult(minLength4('abcd'))
        const successMax = getResult(maxLength12('abcdefghijk'))
        const failedMin = getResult(minLength4('abc'))
        const failedMax = getResult(maxLength12('abcdefghijklmn'))

        expect(successMin.result).to.eq(true)
        expect(successMax.result).to.eq(true)
        expect(failedMin.result).to.eq(false)
        expect(failedMax.result).to.eq(false)
        expect(failedMin.val).to.eq(minMessage)
        expect(failedMax.val).to.eq(maxMessage)
    })

    it('Rule: regex', () => {
        const message = '알파벳 대소문자만 입력 가능합니다'
        const regex = /^[a-zA-Z\s]+$/
        const success = getResult(r.regex(regex)(message)('Krafton'))
        const failed = getResult(r.regex(regex)(message)('Kraft0n'))

        expect(success.result).to.eq(true)
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })

    it('Rule: numeric', () => {
        const message = '숫자만 입력 가능합니다'
        const success = getResult(r.numeric(message)('3141592'))
        const failed = getResult(r.numeric(message)('3.141592'))

        expect(success.result).to.eq(true)
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })

    it('Rule: alphaNumeric', () => {
        const message = '알파벳 대소문자와 숫자만 입력가능합니다'
        const success = getResult(r.alphaNumeric(message)('Krafton2022'))
        const failed = getResult(r.alphaNumeric(message)('Krafton-2022'))

        expect(success.result).to.eq(true)
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })

    it('Rule: same, diff', () => {
        const sameMessage = '다른 값이 있습니다'
        const diffMessage = '같은 값이 있습니다'
        const successSame = getResult(r.same(sameMessage)([100, 100]))
        const successDiff = getResult(r.diff(diffMessage)([100, 200]))
        const failedSame = getResult(r.same(sameMessage)(['Vv', 'vV']))
        const failedDiff = getResult(r.diff(diffMessage)(['몰?루', '몰?루']))

        expect(successSame.result).to.eq(true)
        expect(successDiff.result).to.eq(true)
        expect(failedSame.result).to.eq(false)
        expect(failedDiff.result).to.eq(false)
        expect(failedSame.val).to.eq(sameMessage)
        expect(failedDiff.val).to.eq(diffMessage)
    })

    it('Rule: url', () => {
        const message = '옳바른 URL을 입력해주세요'
        const success = getResult(r.url(message)('https://www.krafton.com'))
        const failed = getResult(r.url(message)('ftp://krafton.com'))

        expect(success.result).to.eq(true)
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })

    it('Rule: cellphone(S.Korea)', () => {
        const message = '옳바른 휴대전화 번호를 입력해주세요'
        const correctNumbers = [
            '010-2020-1256',
            '010-202-1256',
            '018-020-1413',
            '01020201256',
            '010 202 2156',
            '0180201413'
        ]
        correctNumbers.forEach(number => {
            const passed = getResult(r.cellphone(message)(number))
            expect(passed.result).to.eq(true)
        })

        const failed = getResult(r.cellphone(message)('1577-1577'))
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })

    it('Rule: gte, lte, gt, lt', () => {
        const messageGte = '10 이상'
        const messageLte = '10 이하'
        const messageGt = '10 초과'
        const messageLt = '10 미만'
        const gte10 = r.gte(10)(messageGte)
        const lte10 = r.lte(10)(messageLte)
        const gt10 = r.gt(10)(messageGt)
        const lt10 = r.lt(10)(messageLt)

        const gteSuccess = getResult(gte10(10))
        const lteSuccess = getResult(lte10(10))
        const gtSuccess = getResult(gt10(11))
        const ltSuccess = getResult(lt10(9))
        const gteFailed = getResult(gte10(9))
        const lteFailed = getResult(lte10(11))
        const gtFailed = getResult(gt10(10))
        const ltFailed = getResult(lt10(10))

        expect(gteSuccess.result).to.eq(true)
        expect(lteSuccess.result).to.eq(true)
        expect(gtSuccess.result).to.eq(true)
        expect(ltSuccess.result).to.eq(true)
        expect(gteFailed.result).to.eq(false)
        expect(lteFailed.result).to.eq(false)
        expect(gtFailed.result).to.eq(false)
        expect(ltFailed.result).to.eq(false)
        expect(gteFailed.val).to.eq(messageGte)
        expect(lteFailed.val).to.eq(messageLte)
        expect(gtFailed.val).to.eq(messageGt)
        expect(ltFailed.val).to.eq(messageLt)
    })

    it('Rule: custom rule', () => {
        const isArray = r.custom(value => Array.isArray(value))
        const message = '배열을 입력해주세요'
        const success = getResult(isArray(message)([1, 2, 3]))
        const failed = getResult(isArray(message)('1, 2, 3'))

        expect(success.result).to.eq(true)
        expect(failed.result).to.eq(false)
        expect(failed.val).to.eq(message)
    })
})
