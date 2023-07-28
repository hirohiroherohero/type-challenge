# Flatten

<aside>
💡 주어진 배열을 플랫한 배열 타입으로 바꾸는 Flatten 타입을 구현하세요.

</aside>

```tsx
{
  // 내 시도
  type Flatten<T> = T extends [infer First, ...infer U]
    ? U extends [infer K]
      ? [First, ...Flatten<K>]
      : [First, ...U]
    : [];

  type type1 = Flatten<[]>; // []
  type type2 = Flatten<[1, 2, 3, 4]>; // [1, 2, 3, 4]
  type type3 = Flatten<[1, [2]]>; // [1, 2]
  type type4 = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, [3, 4], [[[5]]]]
  type type5 = Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>; // [{ foo: 'bar'; 2: 10 }, 'foobar']
}

{
  // 정답
  type Flatten<T> = T extends [infer First, ...infer Rest]
    ? First extends unknown[]
      ? [...Flatten<First>, ...Flatten<Rest>]
      : [First, ...Flatten<Rest>]
    : [];

  type type1 = Flatten<[]>; // []
  type type2 = Flatten<[1, 2, 3, 4]>; // [1, 2, 3, 4]
  type type3 = Flatten<[1, [2]]>; // [1, 2]
  type type4 = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
  type type5 = Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>; // [{ foo: 'bar'; 2: 10 }, 'foobar']
}
```

- 내 시도
  - `[infer First, ...infer U]`
    - 일단 첫번째 요소와 나머지 요소를 분리시키고
  - `U extends [infer K]`
    - 나머지 튜플 타입 요소의 안에 타입을 추론하고
  - `? [First, ...Flatten<K>] : [First, ...U]`
    - 추론 가능하면 재귀 시키고 아니면 U를 넣었지만
  - `[2, [3, 4], [[[5]]]]`
    - 이것이 `[infer K]` 로 추론이 되지 않았다…
- 정답
  - `First extends unknown[] ? [...Flatten<First>, ...Flatten<Rest>] : [First, ...Flatten<Rest>]`
    - 내가 설정한 조건과 다르게 첫번째 추론한 타입이 배열타입의 부분집합이라면? 으로 시작했다.
      - 재귀를 돌리면 첫번째 타입이 배열타입이 될 수 있다는 사실을 파악하지 못한게 원인인듯..
    - 첫번째 추론한 타입이 배열타입의 부분집합이라면 둘다 `Flatten`타입을 재귀를 돌렸고 그렇지 않다면 나머지 추론한 타입만 `Flatten` 재귀 돌려 해결
