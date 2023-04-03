# Includes

<aside>
💡 JavaScript의 `Array.includes`함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, `true`또는 `false`를 반환해야 합니다.

</aside>

```tsx
// 내 시도
{
  type Includes<T extends readonly unknown[], U> = T extends (infer R)[]
    ? U extends R
      ? true
      : false
    : never;

  type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
  type isPillarMen2 = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">; // expected to be `true`

  type A = Includes<[{}], { a: "A" }>; // false [true]
  type B = Includes<[boolean, 2, 3, 5, 6, 7], false>; // false [true]
  type C = Includes<[true, 2, 3, 5, 6, 7], boolean>; // false [boolean]
  type D = Includes<[{ a: "A" }], { readonly a: "A" }>; // false [true]
  type E = Includes<[{ readonly a: "A" }], { a: "A" }>; // false [true]
  type F = Includes<[1], 1 | 2>; // false [boolean]
  type G = Includes<[1 | 2], 1>; // ㅈfalse [true]
}

// 정답
{
  type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
    ? 1
    : 2
    ? true
    : false;

  type Includes<T extends readonly unknown[], U> = T extends [
    infer F,
    ...infer R
  ]
    ? Equal<F, U> extends true
      ? true
      : Includes<R, U>
    : false;

  type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
  type isPillarMen2 = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">; // expected to be `true`

  type A = Includes<[{}], { a: "A" }>; // false
  type B = Includes<[boolean, 2, 3, 5, 6, 7], false>; // false
  type C = Includes<[true, 2, 3, 5, 6, 7], boolean>; // false
  type D = Includes<[{ a: "A" }], { readonly a: "A" }>; // false
  type E = Includes<[{ readonly a: "A" }], { a: "A" }>; // false
  type F = Includes<[1], 1 | 2>; // false
  type G = Includes<[1 | 2], 1>; // false
}
```

- 해결방법
  - 내 방법
    - `infer`를 사용하여 배열 안의 타입을 추론했고 그리고 두번째 인자 타입이 추론한 타입의 부분타입이면 `true` 아니면 `false`를 뱉게 했다.
      - 대부분의 경우는 맞는 결과를 뱉어내지만 몇가지 이상한 결과를 뱉는 것들이 있지만 해결하기가 어렵다..
        - `// 예상하는타입 [실제나온타입]`
  - 정답

    - `Equal` 타입과 재귀 타입을 사용해서 해결
      - `Equal`로 `[infer F,...infer R]` 로 뽑아낸 배열 안 첫번째 요소 타입과 두번째 인자로 넘긴 타입을 비교하고 일치하면 true를 불일치 하면 `Includes<R, U>` 로 나머지 요소들을 다시 `Includes` 타입에 인자로 넘겨 계속해서 재귀적으로 타입을 검사하고 끝까지 일치하는게 없다면 `false`를 뱉게 했다.

  - 알아야 할것!
    - 타입의 재귀
    - infer의 활용법 `[infer F,...infer R]`
