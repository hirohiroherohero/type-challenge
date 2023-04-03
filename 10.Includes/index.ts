// 내 시도
{
  type Includes<T extends readonly unknown[], U> = T extends (infer R)[]
    ? U extends R
      ? true
      : false
    : never;

  type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
  type isPillarMen2 = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">; // expected to be `true`

  type A = Includes<[{}], { a: "A" }>; // false [true]
  type B = Includes<[boolean, 2, 3, 5, 6, 7], false>; // false [true]
  type C = Includes<[true, 2, 3, 5, 6, 7], boolean>; // false [boolean]
  type D = Includes<[{ a: "A" }], { readonly a: "A" }>; // false [true]
  type E = Includes<[{ readonly a: "A" }], { a: "A" }>; // false [true]
  type F = Includes<[1], 1 | 2>; // false [boolean]
  type G = Includes<[1 | 2], 1>; // ㅈfalse [true]
}

// 정답
{
  type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
    ? 1
    : 2
    ? true
    : false;

  type Includes<T extends readonly unknown[], U> = T extends [
    infer F,
    ...infer R
  ]
    ? Equal<F, U> extends true
      ? true
      : Includes<R, U>
    : false;

  type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
  type isPillarMen2 = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">; // expected to be `true`

  type A = Includes<[{}], { a: "A" }>; // false
  type B = Includes<[boolean, 2, 3, 5, 6, 7], false>; // false
  type C = Includes<[true, 2, 3, 5, 6, 7], boolean>; // false
  type D = Includes<[{ a: "A" }], { readonly a: "A" }>; // false
  type E = Includes<[{ readonly a: "A" }], { a: "A" }>; // false
  type F = Includes<[1], 1 | 2>; // false
  type G = Includes<[1 | 2], 1>; // false
}
