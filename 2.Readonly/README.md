# Readonly

<aside>
💡 `T`의 모든 프로퍼티를 읽기 전용(재할당 불가)으로 바꾸는 내장 제네릭 `Readonly<T>`를 이를 사용하지 않고 구현하세요.

</aside>

```tsx
// 내 시도
{
    interface Todo {
        title: string;
        description: string;
    }

    type MyReadonly<T> = { readonly [key in keyof T]: T[key] };

    const todo: MyReadonly<Todo> = {
        title: "Hey",
        description: "foobar",
    };

    /**
    todo.title = "Hello"; // Error: cannot reassign a readonly property
    todo.description = "barFoo"; // Error: cannot reassign a readonly property
     */
}
```

-   해결방법
    -   `MyPick` 타입과 마찬가지로 `in`으로 `T`의 `key`를 나열했고 `T[key]`로 `T`의 나열한 키를 사용해 맞는 값을 불러왔다.
    -   앞에 `readonly`를 써 `readonly`로 만들어줬다.
