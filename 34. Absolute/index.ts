{
  type Absolute<T extends number | string | bigint> = `${T}` extends `-${T}`
    ? string
    : bigint;

  type type1 = Absolute<0>; // '0'
  type type2 = Absolute<-0>; // '0'
  type type3 = Absolute<10>; // '10'
  type type4 = Absolute<-5>; // '5'
  type type5 = Absolute<"0">; // '0'
  type type6 = Absolute<"-0">; // '0'
  type type7 = Absolute<"10">; // '10'
  type type8 = Absolute<"-5">; // '5'
  type type9 = Absolute<-1_000_000n>; // '1000000'
  type type10 = Absolute<9_999n>; // '9999'
}
