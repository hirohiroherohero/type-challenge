# Capitalize

<aside>
💡 문자열의 첫 글자만 대문자로 바꾸고 나머지는 그대로 놔두는 `Capitalize<T>`를 구현하세요.

</aside>

```tsx
{
	// 내 시도
	type MyCapitalize<S extends string> = S extends `${infer X}${infer R}`
	  ? `${Uppercase<X>}${R}`
	  : S;

	type capitalized = MyCapitalize<"hello world">; // 'Hello world'
	type capitalized2 = MyCapitalize<"hirohiroherohero">; // 'Hirohiroherohero'
	type capitalized3 = MyCapitalize<"">; // ''
	type capitalized4 = MyCapitalize<"a">; // 'A'
	type capitalized5 = MyCapitalize<"b">; // 'B'
}

{
  // 정답
	위와 같음.
}
```

- 내 시도
  - `S extends `${infer X}${infer R}``
    - 앞글자의 리터럴 타입인 `X`와 나머지 리터럴 타입 `R`을 추론
  - `Uppercase<X>`
    - upp라고 쳐봤는데 타입스크립트 내장 유틸리티 타입인 `Uppercase<T>`가 있었다..
- `Uppercase<T>`
  - 타입스크립트 내장된 유틸리티 타입 중 하나
    ```tsx
    /**
     * Convert string literal type to uppercase
     */
    type Uppercase<S extends string> = intrinsic;
    ```
  - `intrinsic`
    - 타입스크립트의 `intrinsic`은 내장 타입으로, 내부적으로 사용되는 타입이다. 이는 실제로는 타입스크립트 컴파일러의 내부 로직을 나타내는데 사용된다.
    - `intrinsic`은 타입스크립트 컴파일러의 내부에서 정의되고 사용되며, 일반 사용자가 직접적으로 접근하거나 확인할 수 없는 내부 개념이다. 이는 타입스크립트의 구현 세부 사항을 나타내는 타입으로, 사용자 정의 타입이나 외부 라이브러리로 취급되지 않는다.
    - `intrinsic`은 내장된 유틸리티 타입이나 다른 내장 타입의 동작을 구현하기 위해 사용되는 표기법이다. 이를 통해 컴파일러는 내장 유틸리티 타입을 실제로 동작하도록 구현할 수 있다.
    -
