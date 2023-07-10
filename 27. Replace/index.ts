{
  type Replace<
    S extends string,
    From extends string,
    To extends string
  > = From extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S;

  type replaced = Replace<"types are fun!", "fun", "awesome">; // types are awesome!
  type replaced2 = Replace<"foobarbar", "bar", "foo">; // foofoobar
  type replaced3 = Replace<"foobarbar", "bar", "">; // foobar
  type replaced4 = Replace<"foobarbar", "bra", "foo">; // foobarbar
  type replaced5 = Replace<"", "", "">; // ""
}
