# Absolute

<aside>
💡 number, string, 혹은 bigint을 받는 `Absolute` 타입을 만드세요. 출력은 양수 문자열이어야 합니다.

</aside>

```tsx
{
	// 내 시도
	type Absolute<T extends number | string | bigint> =
    `${T}` extends `-${infer U}` ? U : `${T}`;

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

{
  // 정답
	위와 같음
}
```

- 내 시도
  - 출력은 양수 문자열이어야 하기 때문에 `${T}` 로 문자열을 바꿔줘야겠다 생각했다.
  - 문자열에도 `infer`를 사용할 수 있기 때문에 `infer`를 사용하여 `-` 문자열이 있으면 제거 후 출력했다.
