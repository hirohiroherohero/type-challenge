# Append to object

<aside>
💡 주어진 인터페이스에 새로운 필드를 추가한 object 타입을 구현하세요. 이 타입은 세 개의 인자를 받습니다.

</aside>

```tsx
{
	// 내 시도
	type AppendToObject<T extends { [x: string]: any }, U extends string, V> = {
    [key in keyof T | U]: key extends keyof T ? T[key] : V;
  };

  type test1 = {
    key: "cat";
    value: "green";
  };

  type testExpect1 = {
    key: "cat";
    value: "green";
    home: boolean;
  };

  type test2 = {
    key: "dog" | undefined;
    value: "white";
    sun: true;
  };

  type testExpect2 = {
    key: "dog" | undefined;
    value: "white";
    sun: true;
    home: 1;
  };

  type test3 = {
    key: "cow";
    value: "yellow";
    sun: false;
  };

  type testExpect3 = {
    key: "cow";
    value: "yellow";
    sun: false;
    moon: false | undefined;
  };

  type type1 = AppendToObject<test1, "home", boolean>; // expect testExpect1
  type type2 = AppendToObject<test2, "home", 1>; // expect testExpect2
  type type3 = AppendToObject<test3, "moon", false | undefined>; // expect testExpect3
}

{
  // 정답
	위와 같음.
}
```

- 내 시도
  - 정답~~
  - `[key in keyof T | U]`
    - 프로퍼티의 `key`는 `T` 아니면 `U` 이기 때문에.
  - `key extends keyof T ? T[key] : V`
    - `value`는 `key`가 `keyof T`의 부분타입인지 확인해서 처리
