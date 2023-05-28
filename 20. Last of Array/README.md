# Last of Array

<aside>
💡 배열 `T`를 사용하고 마지막 요소를 반환하는 제네릭 `Last<T>`를 구현합니다.

</aside>

```tsx
{
  // 내 시도
  type arr1 = ["a", "b", "c"];
  type arr2 = [3, 2, 1];

  type Last<T> = T extends [infer R, ...infer U]
    ? U extends never
      ? R
      : Last<U>
    : never;

  type tail1 = Last<arr1>; // expected to be 'c'
  type tail2 = Last<arr2>; // expected to be 1
}

{
  // 정답
	1. type Last<T extends any[]> = [any, ...T][T["length"]];
	2. type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never
}
```

-   내 시도
    -   `T extends [infer R, ...infer U]` 과 재귀타입을 적용하여 배열의 마지막 요소까지 접근을 하고 `U extends never` 조건을 달아 마지막 일 시(첫번째 요소를 제외한 남은 요소가 없을 시) 첫번째 요소 `R`의 타입을 `return`하게 했는데 왜인진 몰라도 `never`가 나온다..
-   정답

    ### 1.

    -   `[any, ...T]`
        -   앞에 `any`를 쓰지않으면 `undefined`가 추론이 됨
            -   왜?
                -   `length` 떄문에 마지막 요소를 추론하기 위해서 앞에 아무 타입으 넣어논것!

    ### 2.

    -   `T extends [...infer _, infer L]` 를 사용하여 마지막 요소만 따로 추론하였고 `return`

-   잘 모르겠는 것
    -   `[…T]` 로 할 경우 `‘마지막 요소 타입’ | undefined` 이런식으로 나와야 할거 같은데 그냥 `undefined`만 나온 이유를 모르겠네…..
