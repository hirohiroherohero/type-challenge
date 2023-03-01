# Pick

<aside>
💡 `T`에서 `K`프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Pick<T, K>`을 이를 사용하지 않고 구현하세요.

</aside>

```tsx
// 내 시도
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

-   해결방법
    -   `[key in K]` 을 사용하여 `T`의 `key`를 나열한다음 `T[key]`로 각 `key`에 맞는 값을 불러왔다.
