{
  type Space = " " | "\n" | "\t";
  type Trim<S extends string> = S extends `${Space}${infer R}`
    ? Trim<R> extends `${infer L}${Space}`
      ? Trim<L>
      : Trim<R>
    : S;

  type trimed = Trim<"  Hello World  ">; // 'Hello World'
  type trimed2 = Trim<"str">; // "str"
  type trimed3 = Trim<"     str">; // "str"
  type trimed4 = Trim<"     str     ">; // "str"
  type trimed5 = Trim<"   \n\t foo bar ">; // "foo bar"
  type trimed6 = Trim<"">; // ""
  type trimed7 = Trim<" \n\t">; // ""
}

{
  type Space = " " | "\n" | "\t";
  type Trim<S extends string> = S extends
    | `${Space}${infer T}`
    | `${infer T}${Space}`
    ? Trim<T>
    : S;

  type trimed = Trim<"  Hello World  ">; // 'Hello World'
  type trimed2 = Trim<"str">; // "str"
  type trimed3 = Trim<"     str">; // "str"
  type trimed4 = Trim<"     str     ">; // "str"
  type trimed5 = Trim<"   \n\t foo bar ">; // "foo bar"
  type trimed6 = Trim<"">; // ""
  type trimed7 = Trim<" \n\t">; // ""
}
