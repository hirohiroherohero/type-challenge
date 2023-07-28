{
  type Flatten<T> = T extends [infer First, ...infer U]
    ? U extends [infer K]
      ? [First, ...Flatten<K>]
      : [First, ...U]
    : [];

  type type1 = Flatten<[]>; // []
  type type2 = Flatten<[1, 2, 3, 4]>; // [1, 2, 3, 4]
  type type3 = Flatten<[1, [2]]>; // [1, 2]
  type type4 = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
  type type5 = Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>; // [{ foo: 'bar'; 2: 10 }, 'foobar']
}

{
  type Flatten<T> = T extends [infer First, ...infer Rest]
    ? First extends unknown[]
      ? [...Flatten<First>, ...Flatten<Rest>]
      : [First, ...Flatten<Rest>]
    : [];

  type type1 = Flatten<[]>; // []
  type type2 = Flatten<[1, 2, 3, 4]>; // [1, 2, 3, 4]
  type type3 = Flatten<[1, [2]]>; // [1, 2]
  type type4 = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
  type type5 = Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>; // [{ foo: 'bar'; 2: 10 }, 'foobar']
}
