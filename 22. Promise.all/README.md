# Promise.all

<aside>
💡 주어진 `PromiseLike` 객체의 배열을 받아서, 반환 값은 반환된 결과 배열인 `Promise<T>`여야 합니다. 여기서 `T`는 반환된 결과 배열을 나타냅니다.

</aside>

```tsx
{
  // 내 시도

  declare function PromiseAll<T extends any[] | readonly unknown[]>(
    values: T
  ): T extends [...infer R] | readonly [...infer R] ? R : never;

  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  });

  // [Promise<number>, 42, Promise<string>]
  const promiseAllTest = PromiseAll([promise1, promise2, promise3] as const);
  // [1, 2, 3]
  const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
  // [1, 2, Promise<number>]
  const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
  // [number, number, Promise<number>]
  const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
}

{
  // 정답
  declare function PromiseAll<T extends any[]>(
    values: readonly [...T]
  ): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;
}
```

- 내 시도
  - `PromiseAll<T extends any[] | readonly unknown[]>`
    - 제너릭으로 `readonly` 배열 또는 그냥 배열 타입이 올수 있음
  - `infer …R` 후 재귀함수를 돌리려 해봤지만 실패… 이번 문제 너무 어려워..
- 정답
  - `PromiseAll<T extends any[]>(values: readonly [...T])`
    - 제네릭으론 배열타입만 받고 그걸 사용하는 곳에 readonly타입을 붙혀서 좁혀줌..
    - 왜?
      - 타입을 좁혀서 안의 요소 하나하나에 접근하려고..?
  - `[K in keyof T]: T[K] extends Promise<infer R> ? R : T[K]`
    - 배열타입에서 `[K in keyof T]: T[K]` 를 사용하면 요소 하나하나에 접근 가능..
    - 당연하다.. 배열은 숫자인 `string`키로 이뤄진 순서있는 객체니까……
    - 그리고 `Promise`로 감싸져있으면 타입을 추론해서 추론한타입을 뱉고 아닐시 걍 뱉기
- 의문
  - `PromiseAll([1, 2, Promise.resolve(3)]);`
    - `PromiseAll<T extends any[] | readonly unknown[]>` 일때 `T`는
      - `(number | Promise<number>)[]`
    - `PromiseAll<T extends [] | readonly unknown[]>` 일때 `T`는
      - `[number, number, Promise<number>]`
