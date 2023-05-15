{
  // 내 시도
  type arr1 = ["a", "b", "c"];
  type arr2 = [3, 2, 1];

  type Last<T extends any[]> = [never, ...T][T["length"]];

  type tail1 = Last<arr1>; // expected to be 'c'
  type tail2 = Last<arr2>; // expected to be 1
  type tail3 = Last<[]>;
}

{
  // 정답
  type Last<T extends any[]> = [any, ...T][T["length"]];
}
