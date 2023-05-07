# Omit

<aside>
💡 `T`에서 `K` 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Omit<T, K>`를 이를 사용하지 않고 구현하세요.

</aside>

```tsx
{
  // 내 시도
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type MyOmit<T, K extends keyof T> = {
    [key in keyof T as key extends K ? never : key]: T[key];
  };

  type TodoPreview = MyOmit<Todo, "description" | "title">;

  const todo: TodoPreview = {
    completed: false,
  };
}
```

- 내 시도
  - 실제 타입 유틸리티의 `Omit`을 보니 `type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;` 이여서 `Pick`안에 `Exclude`를 구현했다.
  - `key in keyof T` 가 `extends K` 인지 조건을 달려 했는데 괄호도 안먹고 내가 원하는대로 구현이 되지 않았는데 구글링 해보니 `as` 를 사용하여 `key in keyof T` 를 내가 원하는대로 정의할 수 있었다.
