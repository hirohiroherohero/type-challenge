# Trim

<aside>
💡 정확한 문자열 타입이고 양쪽 끝의 공백이 제거된 새 문자열을 반환하는 `Trim<T>`를 구현하십시오.

</aside>

```tsx
{
  // 내 시도
  type Space = " " | "\n" | "\t";
  type Trim<S extends string> = S extends `${Space}${infer R}`
    ? Trim<R> extends `${infer L}${Space}`
      ? Trim<L>
      : Trim<R>
    : S;

  type trimed = Trim<"  Hello World  ">; // 'Hello World'
  type trimed2 = Trim<"str">; // "str"
  type trimed3 = Trim<"     str">; // "str"
  type trimed4 = Trim<"     str     ">; // "str"
  type trimed5 = Trim<"   \n\t foo bar ">; // "foo bar"
  type trimed6 = Trim<"">; // ""
  type trimed7 = Trim<" \n\t">; // ""
}

{
  // 정답
  type Trim<S extends string> = S extends
    | `${Space}${infer T}`
    | `${infer T}${Space}`
    ? Trim<T>
    : S;
}
```

- 내 시도
  - `Trim Left`의 결과에서 뒤에 더 `Space` 타입과 매치 되는게 있으면 `Trim`을 재귀 시켰다.
- 정답
  - `` ${Space}${infer T}` | `${infer T}${Space} ``
    - 내가 복잡하게 설정했던 조건을 유니온 타입으로 간단히 풀어냈다… 오..
