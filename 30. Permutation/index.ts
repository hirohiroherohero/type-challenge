{
  type Permutation<T> = T extends never ? [] : [T];

  type type1 = Permutation<"A">; // ['A']
  type type2 = Permutation<"A" | "B" | "C">; // ['A'] | ['B'] | ['C']
  type type3 = Permutation<"B" | "A" | "C">; // ['A'] | ['B'] | ['C']
  type type4 = Permutation<boolean>; // [false] | [tru]
  type type5 = Permutation<never>; // never
}

{
  type Permutation<T, K = T> = [T] extends [never]
    ? []
    : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

  type type1 = Permutation<"A">; // ['A']
  type type2 = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  type type3 = Permutation<"B" | "A" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  type type4 = Permutation<boolean>; // [false, true] | [true, false]
  type type5 = Permutation<never>; // []
}

type UnionToArray<T, K = T> = K extends K ? [K] : [Exclude<T, K>];

type A = UnionToArray<"a" | "b" | "c">;
