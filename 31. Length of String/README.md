# Length of String

<aside>
💡 `String#length`처럼 동작하는 문자열 리터럴의 길이를 구하세요.

</aside>

```tsx
{
  // 내 시도
  type LengthOfString<S extends string> = S extends `${infer R}${infer L}`
    ? [R, ...LengthOfString<L>]["length"]
    : S extends ""
    ? []
    : never;

  type type1 = LengthOfString<"">; //  []
  type type2 = LengthOfString<"kumiko">; //  number
  type type3 = LengthOfString<"reina">; //  number
  type type4 = LengthOfString<"Sound! Euphonium">; //  number
}

{
  // 정답
  type LengthOfString<
    S extends string,
    T extends string[] = []
  > = S extends `${string}${infer R}`
    ? LengthOfString<R, [...T, string]>
    : T["length"];

  type type1 = LengthOfString<"">; //  0
  type type2 = LengthOfString<"kumiko">; //  6
  type type3 = LengthOfString<"reina">; //  5
  type type4 = LengthOfString<"Sound! Euphonium">; //  16
}
```

- 내 시도
  - 일단 제너릭으로 들어온 리터럴 `string`에 대한 각 글자들을 요소로 가지는 배열로 만들어서 `[TYPE][”length”]`로 뽑아내려 시도를 했다.
    - `ex) type A = ["1", "2"]["length"] // A는 2`
    - 하지만 number로 나온다.. 왜 그러지..
    - 배열로 뽑아내는건 성공
- 정답
  - `${string}`
    - 타입스크립트의 타입 시스템에서 `string literal type`을 나타낸다.
    - 이것은 문자열의 모든 가능한 리터럴 값을 의미한다.
      - `${"a"}`라면 `a`라는 문자열을 의미하고, `${"abc"}`라면 `abc`라는 문자열을 의미.
    - 이 코드는 유니코드 기호(이모지 등)와 함께 작동하지 않는다.
      - 타입스크립트의 문자열은 기본적으로 유니코드를 지원하지만, `${infer R}` 부분은 단일 문자를 처리하기 위해 설계되어 있기 때문
      - 이를 해결하는 방법 중 하나는 두 개의 `infer` 키워드를 사용하는 것
      ```tsx
      type LengthOfString<
        S extends string,
        T extends string[] = []
      > = S extends `${infer First}${infer Rest}`
        ? LengthOfString<Rest, [...T, string]>
        : T["length"];
      ```
      - 한 가지 주의해야 할 점은, 이러한 문자열 처리는 재귀적인 방식이기 때문에, 문자열의 길이가 길어질수록 타입 시스템의 스택 제한에 도달할 수 있다.
