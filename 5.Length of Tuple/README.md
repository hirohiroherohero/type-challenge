# Length of Tuple

<aside>
π‘ λ°°μ΄(νν)μ λ°μ κΈΈμ΄λ₯Ό λ°ννλ μ λ€λ¦­Β `Length<T>`λ₯Ό κ΅¬ννμΈμ.

</aside>

```tsx
// λ΄ μλ
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

// μ λ΅ νμΈ
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

-   ν΄κ²° λ°©λ²
    -   μ λλ¦­ `T`λ μ΄λ ν `tuple`μ `extends` ν  κ²μ΄κ³  μ΄κ²μ κ² λ§μ§λ€ λ³΄λ `T["length"]`λ‘ μ κ·Όν  μ μλ€λκ±Έ μκ²λλ€.
    -   `readonly`κ° λΆλ μ΄μ λ λ³κ²½ν  μ μλ `tuple`μ΄λΌ κ·Έλ°κ±° κ°λ€.
