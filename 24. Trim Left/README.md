# Trim Left

<aside>
💡 정확한 문자열 타입이고 시작 부분의 공백이 제거된 새 문자열을 반환하는 `TrimLeft<T>`를 구현하십시오.

</aside>

```tsx
{
  // 내 시도
  type TrimLeft<S extends string> = S[0];

  type trimed = TrimLeft<"  Hello World  ">; // 'Hello World  '
  type trimed2 = TrimLeft<"str">; // "str"
  type trimed3 = TrimLeft<"     str">; // "str"
  type trimed4 = TrimLeft<"     str     ">; // "str     "
  type trimed5 = TrimLeft<"   \n\t foo bar ">; // "foo bar "
  type trimed6 = TrimLeft<"">; // ""
  type trimed7 = TrimLeft<" \n\t">; // ""
}

{
  // 정답
  type Space = " " | "\n" | "\t";
  type TrimLeft<S extends string> = S extends `${Space}${infer R}`
    ? TrimLeft<R>
    : S;
}
```

- 내 시도
  - `type TrimLeft<S extends string> = S[0]`
    - `S`는 리터럴 `string` 타입이기 때문에 `[0]`로 접근하면 첫 글자가 리터럴 `string` 타입으로 나올줄 알았지만 그냥 `string` 타입으로 나온다..
- 정답
  - `type Space = " " | "\n" | "\t"`
    - `trim` 해야 할 리터럴 `string`타입을 선언
  - `S extends `${Space}${infer R}``
    - `S extends `${Space}${infer R}``
      - 전체 문자열에서 `trim` 해야할 리터럴 문자열이 첫번째에 있다면 그걸 제외한 나머지 문자열을 `infer R` 로 추론하고
    - `TrimLeft<R> : S`
      - 다시 `TrimLeft` 타입으로 재귀, 더이상 `trim`할 문자열이 없다면 `S` 타입을 리턴
