# Parameters

<aside>
💡 내장 제네릭 `Parameters<T>`를 이를 사용하지 않고 구현하세요.

</aside>

```tsx
{
  // 내 시도
  const foo = (arg1: string, arg2: number): void => {};
  const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
  const baz = (): void => {};

  type MyParameters<T extends (...arg: any) => any> = T extends (
    ...arg: infer R
  ) => any
    ? R
    : never;

  type FunctionParamsType1 = MyParameters<typeof foo>; // [string, number]
  type FunctionParamsType2 = MyParameters<typeof bar>; // [boolean, {a: "A"}]
  type FunctionParamsType3 = MyParameters<typeof baz>; // []
}
```

- 해결 방법
  - 제네릭 `T`를 받아 함수 타입을 상속했고 함수의 인자 타입에 `infer`를 사용해 타입을 추론한다음 반환하게 했다.
