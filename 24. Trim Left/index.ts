{
  type TrimLeft<S extends string> = S[0];

  type trimed = TrimLeft<"  Hello World  ">; // 'Hello World  '
  type trimed2 = TrimLeft<"str">; // "str"
  type trimed3 = TrimLeft<"     str">; // "str"
  type trimed4 = TrimLeft<"     str     ">; // "str     "
  type trimed5 = TrimLeft<"   \n\t foo bar ">; // "foo bar "
  type trimed6 = TrimLeft<"">; // ""
  type trimed7 = TrimLeft<" \n\t">; // ""
}

{
  type Space = " " | "\n" | "\t";
  type TrimLeft<S extends string> = S extends `${Space}${infer R}`
    ? TrimLeft<R>
    : S;

  type trimed = TrimLeft<"  Hello World  ">; // 'Hello World  '
  type trimed2 = TrimLeft<"str">; // "str"
  type trimed3 = TrimLeft<"     str">; // "str"
  type trimed4 = TrimLeft<"     str     ">; // "str     "
  type trimed5 = TrimLeft<"   \n\t foo bar ">; // "foo bar "
  type trimed6 = TrimLeft<"">; // ""
  type trimed7 = TrimLeft<" \n\t">; // ""
}
