import { FV, r } from '../dest/index.js';
import pkg from 'chai/index.js';
const { expect } = pkg;

describe('Form validator test', () => {
    it('Form Validation: Validation passed', () => {
        const passed = FV([
            {
                key: 'User name',
                value: 'Playerunknown',
                rules: [
                    r.required('이름은 필수 항목입니다'),
                    r.minLength(2)('이름은 두 글자 이상입니다')
                ],
            },
            {
                key: 'Email',
                value: 'pubg@krafton.com',
                rules: [
                    r.required('이메일은 필수 항목입니다'),
                    r.email('옳바른 형식의 이메일 주소를 입력해 주세요')
                ]
            }
        ])

        expect(passed.isPassed).to.eq(true)
    })

    it('Form Validation: Validation failed', () => {
        const failed = FV([
            {
                key: 'User name',
                value: '',
                rules: [
                    r.required('이름은 필수 항목입니다'),
                    r.minLength(2)('이름은 두 글자 이상입니다')
                ],
            },
            {
                key: 'Email',
                value: 'pubg=krafton.com',
                rules: [
                    r.required('이메일은 필수 항목입니다'),
                    r.email('옳바른 형식의 이메일 주소를 입력해 주세요')
                ]
            }
        ])

        expect(failed.isPassed).to.eq(false)
        expect(failed.firstMessage).to.eq('이름은 필수 항목입니다')
        expect(failed.lastMessage).to.eq('옳바른 형식의 이메일 주소를 입력해 주세요')
    })

    it('Form Validation: Validation failed & Message function', () => {
        const firstMessage = '이름은 필수 항목입니다'
        const lastMessage = '이름은 두 글자 이상입니다'
        const result = FV([
            {
                key: 'User name',
                value: '',
                rules: [
                    r.required(firstMessage),
                    r.minLength(2)(lastMessage)
                ],
            },
        ])

        result.orFirst(
            () => {},
            message => expect(message).to.eq(firstMessage)
        )

        result.orLast(
            () => {},
            message => expect(message).to.eq(lastMessage)
        )
    })
})
