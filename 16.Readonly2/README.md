# Readonly 2

<aside>
💡 `T`에서 `K` 프로퍼티만 읽기 전용으로 설정해 새로운 오브젝트 타입을 만드는 제릭 `MyReadonly2<T, K>`를 구현하세요. `K`가 주어지지 않으면 단순히 `Readonly<T>`처럼 모든 프로퍼티를 읽기 전용으로 설정해야 합니다.

</aside>

```tsx
{
		// 내 시도
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type MyReadonly2<T, K extends keyof T | void = void> = K extends void
        ? { readonly [key in keyof T]: T[key] }
        :  // 모르겠다.... ;

    const todo: MyReadonly2<Todo, "title" | "description"> = {
        title: "Hey",
        description: "foobar",
        completed: false,
    };

    todo.title = "Hello"; // Error: cannot reassign a readonly property
    todo.description = "barFoo"; // Error: cannot reassign a readonly property
    todo.completed = true; // OK
}

{
  // 정답
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type Exclude<T, U> = T extends U ? never : T;

  type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [key in K]: T[key];
  } & { [key in Exclude<keyof T, K>]: T[key] };

  const todo: MyReadonly2<Todo, "title" | "description"> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  };

  type AllReadonly = MyReadonly2<Todo>;

  todo.title = "Hello"; // Error: cannot reassign a readonly property
  todo.description = "barFoo"; // Error: cannot reassign a readonly property
  todo.completed = true; // OK
}
```

- 내 시도
  - 조건의 “`K`가 주어지지 않으면 단순히 `Readonly<T>`처럼 모든 프로퍼티를 읽기 전용으로 설정해야 합니다.” 부분을 적용하기 위해 `K`에 기본 타입으로 `void`를 주어서 옵셔널하게 만들었고 `extends`로 `keyof T`또는 `void`를 받게 하였다.
    - 그래서 `void`를 `extends`하면 주어진 `T`를 전부 `readonly`로 바꾸었다.
  - 그 다음은 `K extends keyof T`의 조건으로 하여 `true`일시 `readonly`를 붙히고 `false`일시 그냥 내보내면 될거같은데 객체 안에서 저 조건문을 사용하는 법을 모르겠다..
- 정답
  - 접근부터 잘못한거 같다.
    - 일단 기본 타입을 `void`로 할 필요가 없었다.
  - 나는 조건을 통하여 한 객체안에 넣으려 했지만 `&` 타입을 이용해서 해결하는 방법이 있었다!!!
    - `&` 인터섹션 타입은 교집합이기 때문에 결국 하나의 객체타입으로 볼 수 있다!!
