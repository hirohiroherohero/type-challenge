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
