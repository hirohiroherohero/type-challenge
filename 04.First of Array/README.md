# First of Array

<aside>
💡 배열(튜플) `T`를 받아 첫 원소의 타입을 반환하는 제네릭 `First<T>`를 구현하세요.

</aside>

```tsx
// 내 시도
{
    type arr1 = ["a", "b", "c"];
    type arr2 = [3, 2, 1];

    type First<T extends any[]> = T[0];

    type head1 = First<arr1>; // expected to be 'a'
    type head2 = First<arr2>; // expected to be 3
}

// 정답 확인
{
    type arr1 = ["a", "b", "c"];
    type arr2 = [3, 2, 1];
    type arr3 = [];

    type First<T extends any[]> = T extends [] ? never : T[0];

    type head1 = First<arr1>; // expected to be 'a'
    type head2 = First<arr2>; // expected to be 3
    type head3 = First<arr3>; // expected to be never
}
```

-   해결 방법
    -   내 시도도 맞긴 하지만 제너릭 타입이 빈배열 타입일때의 유효성을 생각을 못했다.
    -   `type First<T extends any[]> = T extends [] ? never : T[0]` 로 `T`의 타입이 빈 배열 탕비일시 `never`를 반환하여 타입 유효성 체크를 해야한다.
    -   타입 유효성 체크를 생각하자!
