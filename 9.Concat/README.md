# Concat

<aside>
💡 JavaScript의 `Array.concat`함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, 인수를 왼쪽부터 concat한 새로운 배열을 반환해야 합니다.

</aside>

```tsx
// 내 시도
{
    type Concat<
        T1 extends unknown[],
        T2 extends unknown[]
    > = T1 extends (infer R1)[]
        ? T2 extends (infer R2)[]
            ? [R1, R2]
            : never
        : never;

    type Result = Concat<[1], [2]>; // expected to be [1, 2]

    type Result2 = Concat<[1, 2, 3], [4, 5, 6]>; // [2 | 3 | 1, 4 | 5 | 6]
}

// 정답 확인
{
    type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

    type Result = Concat<[1], [2]>; // expected to be [1, 2]
}
```

-   해결 방법
    -   나는 `infer`를 사용하여 배열 안의 타입을 추론해서 배열타입으로 묶어 내보냈다.
        -   하지만 `Result2` 방법을 하니까 이상한 타입이 나온다.
        -   여러가지가 들어갔을때 유니온 타입으로 들어간다..
    -   다른사람들이 작성한 정답을 보니 스프레드 문법을 사용하여 해결했다.
        -   더욱 간단하고 명시적…
    -   하지만 `array.concat`은 두개의 배열의 타입이 같아야 하는데 그거에 대한 처리가 안되어 있다.
        -   함수의 시그니처 타입을 사용하지 않고 가능할까…..?
        -   인자의 타입을 한방에 정리해야하는데..
