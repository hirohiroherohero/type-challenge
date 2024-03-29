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
