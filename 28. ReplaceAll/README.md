# ReplaceAll

<aside>
💡 주어진 문자열 `S`에서 부분 문자열 `From`을 찾아 모두 `To`로 교체하는 제네릭 `ReplaceAll<S, From, To>`을 구현하세요.

</aside>

```tsx
{
  // 내 시도
  type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
  > = S extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? From extends ""
      ? S
      : ReplaceAll<`${L}${To}${R}`, From, To>
    : S;

  type type1 = ReplaceAll<"foobar", "bar", "foo">; // 'foofoo'
  type type2 = ReplaceAll<"foobar", "bag", "foo">; // 'foobar'
  type type3 = ReplaceAll<"foobarbar", "bar", "foo">; // 'foofoofoo'
  type type4 = ReplaceAll<"t y p e s", " ", "">; // 'types'
  type type5 = ReplaceAll<"foobarbar", "", "foo">; // 'foobarbar'
  type type6 = ReplaceAll<"barfoo", "bar", "foo">; // 'foofoo'
  type type9 = ReplaceAll<"", "", "">; // ''

  // 실패
  type type7 = ReplaceAll<"foobarfoobar", "ob", "b">; // 'fobarfobar' 내 결과 'fbarfbar'
  type type8 = ReplaceAll<"foboorfoboar", "bo", "b">; // 'foborfobar' 내 결과 'fobrfobar'
}

{
  // 정답
  type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
  > = From extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${ReplaceAll<R, From, To>}`
    : S;
}
```

- 내 시도
  - `Replace`와 동일한 방법으로 접근했다.
    - 대신 `From`이 있으면 `To`를 넣어서 재귀를 돌렸다.
    - 또한 `From`이 `“”`이면 그대로 `S` 타입을 리턴했다.
  - 문제
    - `type7`
      - `"foobarfoobar", "ob", "b"` 을 재귀하면 `fobar…` 가 되는데 또 `ob`가 있으니 재귀를 돌아 결국 `fbar…` 이 된다.
      - `type8`도 마찬가지..
- 정답
  - `${L}${To}${ReplaceAll<R, From, To>}`
    - `L`과 `To`는 그대로 남기고 안에서 재귀함수를 통해 해결..
    - 천재냐..
