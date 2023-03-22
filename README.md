# form-validation
## Usage
```typescript
import { F, v, r } from '@web-tech-team/fv'
import type { ValidationResult } from '@web-tech-team/fv';
```
### F 함수
```typescript
const validationResult: ValidationResult = F([
    v(
        'Playerunknown', 
        r.required('이름은 필수 항목입니다'), 
        r.minLength(2)('이름은 두 글자 이상입니다')
    ),
    v(
        'pubg@krafton.com', 
        r.required('이메일은 필수 항목입니다'), 
        r.email('옳바른 형식의 이메일 주소를 입력해 주세요')
    ),
])
```
```
validationResult => {
    "messages": [
        "이름은 필수 항목입니다",
        "이름은 두 글자 이상입니다",
        "옳바른 형식의 이메일 주소를 입력해 주세요"
    ],
    "isPassed": false,
    "firstMessage": "이름은 필수 항목입니다",
    "lastMessage": "옳바른 형식의 이메일 주소를 입력해 주세요",
    "orFirst": [Function],
    "orLast": [Function],
}
```
```javascript
const result = F([...])

result.orFirst(
    () => // 폼 검증 성공시 실행되는 함수 정의,
    message => alert(message),
    // 폼 검증 실패시 첫번째 메세지를 전달
)

result.orLast(
    () => // 폼 검증 성공시 실행되는 함수 정의,
    message => alert(message),
    // 폼 검증 실패시 마지막 메세지를 전달
)
```

### v 함수
하나의 필드를 검증하기 위한 함수로 다음과 같이 단독으로 사용 가능하다.
```typescript
v(
    someValue,
    r.required('이름은 필수 항목입니다'), 
    r.minLength(2)('이름은 두 글자 이상입니다')
)
```

v함수는 ResultList 라는 클래스를 반환한다.
```typescript
ResultList {
  _results: [
    Result { val: '이름은 필수 항목입니다', isSuccessValue: false },
    Result { val: '이름은 두 글자 이상입니다', isSuccessValue: false }
  ]
}
```

### ResultList.toArray()
ResultList에서 검증에 실패한 항목들의 메세지만을 배열로 반환한다. 
```typescript
ResultList {
  _results: [
    Result { val: '이름은 필수 항목입니다', isSuccessValue: false },
    Result { val: '이름은 두 글자 이상입니다', isSuccessValue: true }
  ]
}.toArray() => ['이름은 두 글자 이상입니다']
```

### ResultList.toResult()
ResultList에서 검증에 실패한 항목들의 Result 객체를 반환한다. 
```typescript
ResultList {
  _results: [
    Result { val: '이름은 필수 항목입니다', isSuccessValue: false },
    Result { val: '이름은 두 글자 이상입니다', isSuccessValue: true }
  ]
}.toArray() => [
  Result { val: '이름은 필수 항목입니다', isSuccessValue: false },
]
```

### ResultList.getFirst()
ResultList의 첫번째 요소를 반환한다.
```typescript
ResultList {
  _results: [
    Result { val: '이름은 필수 항목입니다', isSuccessValue: false },
    Result { val: '이름은 두 글자 이상입니다', isSuccessValue: false }
  ]
}.toArray() => '이름은 필수 항목입니다'
```

### ResultList.getLast()
ResultList의 마지막 요소를 반환한다.
```typescript
ResultList {
  _results: [
    Result { val: '이름은 필수 항목입니다', isSuccessValue: false },
    Result { val: '이름은 두 글자 이상입니다', isSuccessValue: false }
  ]
}.toArray() => '이름은 두 글자 이상입니다'
```

### ResultList.isPassed()
ResultList의 모든 요소가 검증에 성공했는지 여부를 반환한다.
```typescript
ResultList {
  _results: [
    Result { val: '이름은 필수 항목입니다', isSuccessValue: false },
    Result { val: '이름은 두 글자 이상입니다', isSuccessValue: false }
  ]
}.isPassed() => false
```

### r 함수
폼을 검증하기 위한 세부적인 함수들의 집합으로 반환 값은 다음과 같으며, 각각의 함수들은 단독으로 사용할 수 있다.
```javascript
// Validation passed: Success
{
    val: '각 Task의 key 값',
    isSuccessValue: true
}

// Validation failed: Fail
{
    val: '검증 실패시 메세지',
    isSuccessValue: false
}
```

#### r.required
값의 유무를 검증한다. 값이 null, undefined, 빈 문자열 인 경우 실패한다
```javascript
[
  v(
    '',
    r.required('이름은 필수 항목입니다'),
  ),
]
```

#### r.email
이메일 형식을 검증한다
```javascript
[
  v(
    'company@krafton.com',
    r.email('검증 실패 메세지'),
  ),
]
```

#### r.url
URL 형식을 검증한다
```javascript
[
  v(
    'https://krafton.com',
    r.url('검증 실패 메세지'),
  ),
]
```

#### r.cellphone
01로 시작하는 한국의 휴대폰 번호의 형식을 검증한다. 옳바른 형식으로 판단하는 케이스는 다음과 같다
```
'010-2020-1256'
'010-202-1256'
'018-020-1413'
'01020201256'
'010 202 2156'
'0180201413'
```
```javascript
[
  v(
    '02-784-2843',
    r.cellphone('검증 실패 메세지'),
  ),
]
```
#### r.minLength
문자열의 최소 길이 검증
```javascript
[
  v(
    'Some text',
    r.minLength(5)('검증 실패 메세지')
  ),
]
```
#### r.maxLength
문자열의 최대 길이 검증
```javascript
[
  v(
    'Some text',
    r.maxLength(12)('검증 실패 메세지')
  ),
]
```
#### r.gte
숫자의 크기가 지정된 값 ``이상``인지 검증
```javascript
[
  v(
    9,
    r.gte(10)('검증 실패 메세지')
  ),
]
```
#### r.lte
숫자의 크기가 지정된 값 ``이하``인지 검증
```javascript
[
  v(
    6,
    r.lte(3)('검증 실패 메세지')
  ),
]
```
#### r.gt
숫자의 크기가 지정된 값을 ``초과``하는지 검증
```javascript
[
  v(
    4,
    r.gt(3)('검증 실패 메세지')
  ),
]
```
#### r.lt
숫자의 크기가 지정된 값 ``미만``인지 검증
```javascript
[
  v(
    6,
    r.lt(6)('검증 실패 메세지')
  ),
]
```
#### r.regex
정규식 검사를 실행
```javascript
[
  v(
    '크래프톤',
    r.regex(/^[가-힣]+$/)('검증 실패 메세지')
  ),
]
```
#### r.numeric
주어진 값이 숫자로만 이루어져 있는지 검증
```javascript
[
  v(
    'K201',
    r.numeric('검증 실패 메세지')
  ),
]
```
#### r.alphaNumeric
주어진 값이 숫자와 알파벳 대소문자로만 이루어져 있는지 검증
```javascript
[
  v(
    'Krafton2023',
    r.alphaNumeric('검증 실패 메세지')
  ),
]
```
#### r.same
주어진 값들이 모두 같은지 검증
```javascript
[
  v(
    [1, 1, 1],
    r.same('검증 실패 메세지')
  ),
]
```
#### r.diff
주어진 값들이 모두 서로 다른 값인지 검증
```javascript
[
  v(
    [1, 2, 3],
    r.diff('검증 실패 메세지')
  ),
]
```
#### r.custom
사용자 정의 규칙을 생성한다. 다음은 값이 배열인지 검증하는 규칙을 생성하여 적용하는 코드이다
```javascript
const isArray = r.custom(value => Array.isArray(value))
...
[
  v(
    ['a', 'b', 'c'],
    isArray('검증 실패 메세지')
  ),
]
```
