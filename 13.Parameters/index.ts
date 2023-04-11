{
  // 내 시도
  const foo = (arg1: string, arg2: number): void => {};
  const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
  const baz = (): void => {};

  type MyParameters<T extends (...arg: any) => any> = T extends (
    ...arg: infer R
  ) => any
    ? R
    : never;

  type FunctionParamsType1 = MyParameters<typeof foo>; // [string, number]
  type FunctionParamsType2 = MyParameters<typeof bar>; // [boolean, {a: "A"}]
  type FunctionParamsType3 = MyParameters<typeof baz>; // []
}
