# First of Array

<aside>
π‘ λ°°μ΄(νν)Β `T`λ₯Ό λ°μ μ²« μμμ νμμ λ°ννλ μ λ€λ¦­Β `First<T>`λ₯Ό κ΅¬ννμΈμ.

</aside>

```tsx
// λ΄ μλ
{
    type arr1 = ["a", "b", "c"];
    type arr2 = [3, 2, 1];

    type First<T extends any[]> = T[0];

    type head1 = First<arr1>; // expected to be 'a'
    type head2 = First<arr2>; // expected to be 3
}

// μ λ΅ νμΈ
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

-   ν΄κ²° λ°©λ²
    -   λ΄ μλλ λ§κΈ΄ νμ§λ§ μ λλ¦­ νμμ΄ λΉλ°°μ΄ νμμΌλμ μ ν¨μ±μ μκ°μ λͺ»νλ€.
    -   `type First<T extends any[]> = T extends [] ? never : T[0]` λ‘ `T`μ νμμ΄ λΉ λ°°μ΄ νλΉμΌμ `never`λ₯Ό λ°ννμ¬ νμ μ ν¨μ± μ²΄ν¬λ₯Ό ν΄μΌνλ€.
    -   νμ μ ν¨μ± μ²΄ν¬λ₯Ό μκ°νμ!
