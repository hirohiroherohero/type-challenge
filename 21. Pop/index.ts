{
  // 내 시도
  type Pop<T extends any[]> = T extends [...infer R, infer _] ? R : never;
  type Shift<T extends any[]> = T extends [infer _, ...infer R] ? R : never;
  type Push<T extends any[], V> = [...T, V];
  type Unshift<T extends any[], V> = [V, ...T];

  type arr1 = ["a", "b", "c", "d"];
  type arr2 = [3, 2, 1];

  type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2>; // expected to be [3, 2]
  type re3 = Shift<arr1>; // expected to be ["b", "c", "d"]
  type re4 = Shift<arr2>; // expected to be [2, 1]
  type re5 = Push<arr1, "e">; // expected to be ["a", "b", "c", "d", "e"]
  type re6 = Push<arr2, 0>; // expected to be [3, 2, 1, 0]
  type re7 = Unshift<arr1, "e">; // expected to be ["e", "a", "b", "c", "d"]
  type re8 = Unshift<arr2, 0>; // expected to be [0, 3, 2, 1]
}
