# Pick

<aside>
π‘ `T`μμΒ `K`νλ‘νΌν°λ§ μ νν΄ μλ‘μ΄ μ€λΈμ νΈ νμμ λ§λλ λ΄μ₯ μ λ€λ¦­Β `Pick<T, K>`μ μ΄λ₯Ό μ¬μ©νμ§ μκ³  κ΅¬ννμΈμ.

</aside>

```tsx
// λ΄ μλ
{
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type MyPick<T, K extends keyof T> = { [key in K]: T[key] };

    type TodoPreview = MyPick<Todo, "title" | "completed">;

    const todo: TodoPreview = {
        title: "Clean room",
        completed: false,
    };
}
```

-   ν΄κ²°λ°©λ²
    -   `[key in K]` μ μ¬μ©νμ¬ `T`μ `key`λ₯Ό λμ΄νλ€μ `T[key]`λ‘ κ° `key`μ λ§λ κ°μ λΆλ¬μλ€.
