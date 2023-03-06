# Length of Tuple

<aside>
💡 배열(튜플)을 받아 길이를 반환하는 제네릭 `Length<T>`를 구현하세요.

</aside>

```tsx
// 내 시도
{
    type tesla = ["tesla", "model 3", "model X", "model Y"];
    type spaceX = [
        "FALCON 9",
        "FALCON HEAVY",
        "DRAGON",
        "STARSHIP",
        "HUMAN SPACEFLIGHT"
    ];

    type Length<T extends unknown[]> = T["length"];

    type teslaLength = Length<tesla>; // expected 4
    type spaceXLength = Length<spaceX>; // expected 5
}

// 정답 확인
{
    type tesla = ["tesla", "model 3", "model X", "model Y"];
    type spaceX = [
        "FALCON 9",
        "FALCON HEAVY",
        "DRAGON",
        "STARSHIP",
        "HUMAN SPACEFLIGHT"
    ];

    type Length<T extends readonly unknown[]> = T["length"];

    type teslaLength = Length<tesla>; // expected 4
    type spaceXLength = Length<spaceX>; // expected 5
}
```

-   해결 방법
    -   제너릭 `T`는 어떠한 `tuple`을 `extends` 할 것이고 이것저것 만지다 보니 `T["length"]`로 접근할 수 있다는걸 알게됐다.
    -   `readonly`가 붙는 이유는 변경할 수 없는 `tuple`이라 그런거 같다.
