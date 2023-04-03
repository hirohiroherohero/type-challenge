# If

<aside>
💡 조건 `C`, 참일 때 반환하는 타입 `T`, 거짓일 때 반환하는 타입 `F`를 받는 타입 `If`를 구현하세요. `C`는 `true` 또는 `false`이고, `T`와 `F`는 아무 타입입니다.

</aside>

```tsx
// 내 시도
{
    type If<C extends boolean, T, F> = C extends true ? T : F;

    type A = If<true, "a", "b">; // expected to be 'a'
    type B = If<false, "a", "b">; // expected to be 'b'
}

// 정답 확인
{
    type If<C extends boolean, T, F> = C extends true ? T : F;

    type A = If<true, "a", "b">; // expected to be 'a'
    type B = If<false, "a", "b">; // expected to be 'b'
}
```

-   해결 방법
    -   이번건 쉬웠다.
