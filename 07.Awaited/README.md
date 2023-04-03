# Awaited

<aside>
💡 Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

예시: `Promise<ExampleType>`이 있을 때, `ExampleType`을 어떻게 얻을 수 있을까요?

</aside>

```tsx
// 내 시도
{
    type ExampleType = Promise<string>;

    type MyAwaited<T extends Promise<unknown>> = T extends Promise<unknown>
        ? ReturnType<T["finally"]>
        : never;

    type Result = MyAwaited<ExampleType>; // Promise<string>
}

// 정답 확인
{
    type ExampleType = Promise<string>;

    type MyAwaited<T> = T extends Promise<infer U> ? U : never;

    type Result = MyAwaited<ExampleType>; // string
}
```

-   해결 방법
    -   내 시도
        -   `Promise`의 `interface`에 `finally`라는게 있는데 그것의 `returnType`이 `Promise<T>`여서 활용해보려했는데 저기서 막혀버렸다..
    -   정답 확인
        -   `infer` 키워드를 사용!
            -   조건부 타입의 조건식이 참으로 평가될 때에는 `infer`키워드를 사용할 수 있다.
        -   `infer`의 뜻 → 추론하다!
        -   [자세한 설명](https://velog.io/@from_numpy/TypeScript-infer)
