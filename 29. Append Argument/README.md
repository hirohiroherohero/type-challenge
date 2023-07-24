# Append Argument

<aside>
💡 함수 타입 `Fn`과 어떤 타입 `A`가 주어질 때 `Fn`의 인수와 `A`를 마지막 인수로 받는 `Fn`과 동일한 함수 유형인 `G`를 생성하세요.

</aside>

```tsx
{
  // 내 시도
  type AppendArgument<Fn extends Function, A> = Fn["arguments"]; // any

  type Case1 = AppendArgument<(a: number, b: string) => number, boolean>; // any
  type Case2 = AppendArgument<() => void, undefined>; // any
}

{
  // 정답
  type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T
    ? (...args: [...R, A]) => T
    : never;

  type Case1 = AppendArgument<(a: number, b: string) => number, boolean>; // (a: number, b: string, x: boolean) => number;
  type Case2 = AppendArgument<() => void, undefined>; // (x: undefined) => void;
}
```

- 내 시도
  - `arguments`에 접근했는데 왜 `any`….
  - 모르겠다..
- 정답
  - `Fn extends (...args: infer R) => infer T`
    - 나처럼 `Function` 타입을 `extends` 하지 않고 `infer`를 사용한 함수 타입을 `extends` 하여 사용.
    - `? (...args: [...R, A]) => T`
      - `Fn`이 함수 타입이면 `argument`에 `A`를 추가하고 추론한 `return` 타입을 넣어줘서 해결
  - `infer`를 활용하자…
