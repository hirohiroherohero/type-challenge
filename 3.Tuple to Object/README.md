# Tuple to Object

<aside>
π‘ λ°°μ΄(νν)μ λ°μ, κ° μμμ κ°μ key/valueλ‘ κ°λ μ€λΈμ νΈ νμμ λ°ννλ νμμ κ΅¬ννμΈμ.

</aside>

```tsx
// λ΄ μλ
{
    const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

    type TupleToObject<T extends readonly any[]> = {
        [key in T[number]]: T[key];
    };

    // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
    type result = TupleToObject<typeof tuple>;

    /**
		type result = {
		    tesla: unknown;
		    "model 3": unknown;
		    "model X": unknown;
		    "model Y": unknown;
		}
		*/
}

// μ λ΅ νμΈ
{
    const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

    type TupleToObject<T extends readonly any[]> = {
        [key in T[number]]: key;
    };

    // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
    type result = TupleToObject<typeof tuple>;
}
```

-   ν΄κ²°λ°©λ²
    -   `{ [key in T[number]]: T[key] }` λ‘ νμ§λ§ μμ λ°ν νμμ μ λ΄€μλ `key` κ° λ€μ΄κ° μμλ€β¦
        -   `T[key]` λκΉ λΉμ°ν `unknown` μ΄ λ¨κ² λ€.. λ§λ€..
    -   λλ¬΄ κΈνκ² νμ§λ§κ³  μ²μ²ν ν΄μΌν λ―β¦.
