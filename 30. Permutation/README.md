# Permutation

<aside>
💡 주어진 유니언 타입을 순열 배열로 바꾸는 Permutation 타입을 구현하세요.

</aside>

```tsx
{
  // 내 시도
  type Permutation<T> = T extends never ? [] : [T];

  type type1 = Permutation<"A">; // ['A']
  type type2 = Permutation<"A" | "B" | "C">; // ['A'] | ['B'] | ['C']
  type type3 = Permutation<"B" | "A" | "C">; // ['A'] | ['B'] | ['C']
  type type4 = Permutation<boolean>; // [false] | [tru]
  type type5 = Permutation<never>; // never
}

{
  // 정답
  type Permutation<T, K = T> = [T] extends [never]
    ? []
    : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

  type type1 = Permutation<"A">; // ['A']
  type type2 = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  type type3 = Permutation<"B" | "A" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  type type4 = Permutation<boolean>; // [false, true] | [true, false]
  type type5 = Permutation<never>; // []
}
```

- 내 시도
  - 너무 어려워서 `type1`과 `type5`만 처리하자는 생각으로 도전
    - `type1`
      - 성공
    - `type5`
      - 왜 `never`???
- 정답
  - `[T] extends [never]`
    - 타입스크립트의 조건부 제네릭 타입에 대한 분배법칙
      ```tsx
      type A<T> = T extends string ? true : false;

      type A1 = A<string>; // true
      type A2 = A<number>; // false
      type A3 = A<string | number>; // boolean
      ```
      - 타입스크립트는 조건부 제네릭에 유니온 타입을 넣을시 분배법칙을 적용한다
        ```tsx
        type A3 = A<string | number>;

        string extends string ? true : false | number extends string ? true : false
        -> true | false -> boolean
        ```
      - 조건부 제너릭의 `never`
        - 타입스크립트는 분배 조건부에 대해 `never`를 빈 유니온으로 취급한다.
          - 이는 `‘a’ | never`가 `‘a’`로 단순화 된다는 것을 의미한다.
            - 빈 유니온은 무시하고 모든 유니온을 결합할 수 있다.
        - 그래서 타입스크립트의 조건부 제너릭에 `never`를 넣었을 때 빈 유니온으로 취급이 되어 조건부를 실행하지 않는다.
          - 빈 유니온을 분배 대상으로 둘 시 분배할 요소가 없기 때문
      - 그렇다면 어떻게 타입스크립트한테 `never`를 빈 유니온으로 보지 않도록 해야할까?
        - 제너릭을 분배하기 전에 평가하도록 만들면 `never`의 값이 보존 되며 사라지지 않는다.
        - 제일 간단한 방법은 튜플로 감싸거나 배열로 만드는것.
          ```tsx
          function assertNeverArray<T>(
            value: T[] extends never[] ? true : false
          ) {}
          function assertNeverTuple<T>(
            value: [T] extends [never] ? true : false
          ) {}

          // 둘 다 실패
          assertNeverArray<string>(true);
          assertNeverTuple<string>(true);

          // 둘 다 통과
          assertNeverArray<never>(true);
          assertNeverTuple<never>(true);
          ```
  - `K = T, K extends K`
    - `K = T`
      - 여기서 `K`는 `T`와 같은 유니온이지만
      - `K extends K` 를 사용하면 분배 법칙에 따라 그 유니온 타입이 분리된 하나하나의 타입이 된다.
        - 타입 유니온은 조건부 타입에서 분배가 된다!
          - 이건 `‘a’ | ‘b’ | ‘c’`를 조건문 안에서 `a` 다음에 `b` 다음에 `c`로 처리하도록 하는 방법이다.
