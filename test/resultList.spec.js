import { v, r } from '../dest/index.js';
import pkg from 'chai/index.js';
const { expect } = pkg;

describe('Validator Test', () => {
  it('v function will return ResultList: case success', () => {
    const name = v(
      'Playerunknown',
      r.required('이름은 필수 항목입니다'),
      r.minLength(2)('이름은 두 글자 이상입니다')
    )

    expect(name.isPassed).to.eq(true)
    expect(name.toArray().length).to.eq(0)
    expect(name.getFirst()).to.eq('')
    expect(name.getLast()).to.eq('')
  })

  it('v function will return ResultList: case success', () => {
    const name = v(
      '',
      r.required('이름은 필수 항목입니다'),
      r.minLength(2)('이름은 두 글자 이상입니다')
    )

    expect(name.isPassed).to.eq(false)
    expect(name.toArray().length).to.eq(2)
    expect(name.getFirst()).to.eq('이름은 필수 항목입니다')
    expect(name.getLast()).to.eq('이름은 두 글자 이상입니다')
  })
})
