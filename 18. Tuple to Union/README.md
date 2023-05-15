# Tuple to Union

<aside>
💡 튜플 값으로 유니온 타입을 생성하는 제네릭 `TupleToUnion<T>`를 구현하세요.

</aside>

```tsx
{
  // 내 시도
  type Arr = ["1", "2", "3"];

  type TupleToUnion<T> = T extends [infer First, ...infer Rest]
    ? First | TupleToUnion<Rest>
    : never;

  type Test = TupleToUnion<Arr>;
  type Test2 = TupleToUnion<[123, "456", true]>;
  type Test3 = TupleToUnion<[123]>;
}

{
  // 정답
  type TupleToUnion<T> = T extends Array<infer ITEMS> ? ITEMS : never;

  type TupleToUnion<T extends any[]> = T[number];
}
```

- 내 시도
  - `extends [infer First, ...infer Rest]` 와 재귀타입을 사용하여 반복문을 사용했다.
- 정답
  - 생각보다 더 간단했다.. `infer`를 사용하여 타입을 추론하면 끝이였다..
  - `T[number]`를 사용하는것도 있었다.
    - JS 배열 값에 `as const`로 타입을 좁혀주고 `number`처리했을때 `union`이 나온거랑 똑같은 원리인듯.
