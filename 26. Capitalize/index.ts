type MyCapitalize<S extends string> = S extends `${infer X}${infer R}`
  ? `${Uppercase<X>}${R}`
  : S;

type capitalized = MyCapitalize<"hello world">; // 'Hello world'
type capitalized2 = MyCapitalize<"hirohiroherohero">; // 'Hirohiroherohero'
type capitalized3 = MyCapitalize<"">; // ''
type capitalized4 = MyCapitalize<"a">; // 'A'
type capitalized5 = MyCapitalize<"b">; // 'B'
