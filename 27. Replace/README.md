# Replace

<aside>
💡 문자열 S에서 `From`를 찾아 한 번만 `To`로 교체하는 `Replace<S, From, To>`를 구현하세요.

</aside>

```tsx
{
  // 내 시도
  // 대 실패
  type Space = "" | "!";
  type Replace<
    S extends string,
    From extends string,
    To extends string
  > = S extends `${Space}${From}${infer R}` | `${infer R}${From}${Space}`
    ? `${R}${To}`
    : S;

  type replaced = Replace<"types are fun!", "fun", "awesome">; // "types are awesome"
  type replaced2 = Replace<"foobarbar", "bar", "foo">; // "foobarfoo"
  type replaced3 = Replace<"foobarbar", "bar", "">; // "foobar"
  type replaced4 = Replace<"foobarbar", "bra", "foo">; // "foobarbar"
  type replaced5 = Replace<"", "", "">; // ""
}

{
  // 정답
  type Replace<
    S extends string,
    From extends string,
    To extends string
  > = From extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S;
}
```

- 내 시도
  - `trim`과 같이 `${OOO}${infer R}`을 시도해 봤지만 이건 한글자씩 볼텐데 어떻게 해야하지.....
  - 대 실 패..
- 정답
  - `From extends ""`
    - `From`이 빈 `string`인지 확인 후 빈 `string`이면 들어온 `S` 제너릭 타입 그대로를 반환
  - `S extends `${infer L}${From}${infer R}` ? `${L}${To}${R}`: S;`
    - 아닐 시 두 `infer`를 사용하여 `From`이 있는 곳만 추론 후 `To`로 바꾸고 반환..
