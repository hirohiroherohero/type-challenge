{
  type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
  > = S extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? From extends ""
      ? S
      : ReplaceAll<`${L}${To}${R}`, From, To>
    : S;

  type type1 = ReplaceAll<"foobar", "bar", "foo">; // 'foofoo'
  type type2 = ReplaceAll<"foobar", "bag", "foo">; // 'foobar'
  type type3 = ReplaceAll<"foobarbar", "bar", "foo">; // 'foofoofoo'
  type type4 = ReplaceAll<"t y p e s", " ", "">; // 'types'
  type type5 = ReplaceAll<"foobarbar", "", "foo">; // 'foobarbar'
  type type6 = ReplaceAll<"barfoo", "bar", "foo">; // 'foofoo'
  type type9 = ReplaceAll<"", "", "">; // ''

  // 실패
  type type7 = ReplaceAll<"foobarfoobar", "ob", "b">; // 'fobarfobar' 내 결과 'fbarfbar'
  type type8 = ReplaceAll<"foboorfoboar", "bo", "b">; // 'foborfobar' 내 결과 'fobrfobar'
}

{
  type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
  > = From extends ""
    ? S
    : S extends `${infer R1}${From}${infer R2}`
    ? `${R1}${To}${ReplaceAll<R2, From, To>}`
    : S;

  type type1 = ReplaceAll<"foobar", "bar", "foo">; // 'foofoo'
  type type2 = ReplaceAll<"foobar", "bag", "foo">; // 'foobar'
  type type3 = ReplaceAll<"foobarbar", "bar", "foo">; // 'foofoofoo'
  type type4 = ReplaceAll<"t y p e s", " ", "">; // 'types'
  type type5 = ReplaceAll<"foobarbar", "", "foo">; // 'foobarbar'
  type type6 = ReplaceAll<"barfoo", "bar", "foo">; // 'foofoo'
  type type7 = ReplaceAll<"foobarfoobar", "ob", "b">; // 'fobarfobar'
  type type8 = ReplaceAll<"foboorfoboar", "bo", "b">; // 'foborfobar'
  type type9 = ReplaceAll<"", "", "">; // ''
}
