# Get Return Type

<aside>
💡 내장 제네릭 `ReturnType<T>`을 이를 사용하지 않고 구현하세요.

</aside>

```tsx
{
  // 내 시도
  const fn = (v: boolean) => (v ? 1 : 2);
  const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

  type MyReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
  ) => infer R
    ? R
    : never;

  type ComplexObject = {
    a: [12, "foo"];
    bar: "hello";
    prev(): number;
  };

  type a1 = MyReturnType<() => string>; // string
  type a2 = MyReturnType<() => 123>; // 123
  type a3 = MyReturnType<() => ComplexObject>; // ComplexObject
  type a4 = MyReturnType<() => Promise<boolean>>; // Promise<boolean>
  type a5 = MyReturnType<() => () => "foo">; // () => "foo"
  type a6 = MyReturnType<typeof fn>; // 1 | 2
  type a7 = MyReturnType<typeof fn1>; // 1 | 2
}
```

- 해결 방법
  - 제네릭 `T`를 받아 함수 타입을 상속했고 함수의 리턴 타입에 `infer`를 사용해 타입을 추론한다음 반환하게 했다.
