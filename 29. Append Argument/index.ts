{
  type AppendArgument<Fn extends Function, A> = Fn["arguments"]; // any

  type Case1 = AppendArgument<(a: number, b: string) => number, boolean>; // (a: number, b: string, x: boolean) => number;
  type Case2 = AppendArgument<() => void, undefined>; // (x: undefined) => void;
}

{
  type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T
    ? (...args: [...R, A]) => T
    : never;

  type Case1 = AppendArgument<(a: number, b: string) => number, boolean>; // (a: number, b: string, x: boolean) => number;
  type Case2 = AppendArgument<() => void, undefined>; // (x: undefined) => void;
}
