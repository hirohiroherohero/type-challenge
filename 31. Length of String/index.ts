{
  type LengthOfString<S extends string> = S extends `${infer R}${infer L}`
    ? [R, ...LengthOfString<L>]["length"]
    : S extends ""
    ? []
    : never;

  type type1 = LengthOfString<"">; //  []
  type type2 = LengthOfString<"kumiko">; //  number
  type type3 = LengthOfString<"reina">; //  number
  type type4 = LengthOfString<"Sound! Euphonium">; //  number
}

{
  type LengthOfString<
    S extends string,
    T extends string[] = []
  > = S extends `${string}${infer R}`
    ? LengthOfString<R, [...T, string]>
    : T["length"];

  type type1 = LengthOfString<"">; //  0
  type type2 = LengthOfString<"kumiko">; //  6
  type type3 = LengthOfString<"reina">; //  5
  type type4 = LengthOfString<"Sound! Euphonium">; //  16
}
