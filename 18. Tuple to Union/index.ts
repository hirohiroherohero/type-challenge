{
  // 내 시도
  type Arr = ["1", "2", "3"];

  type TupleToUnion<T> = T extends [infer First, ...infer Rest]
    ? First | TupleToUnion<Rest>
    : never;

  type Test = TupleToUnion<Arr>;
  type Test2 = TupleToUnion<[123, "456", true]>;
  type Test3 = TupleToUnion<[123]>;
}

{
  // 정답
  type TupleToUnion<T> = T extends Array<infer ITEMS> ? ITEMS : never;

  type TupleToUnion2<T extends any[]> = T[number];
}
