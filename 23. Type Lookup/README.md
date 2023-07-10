# Type Lookup

<aside>
💡 때때로 유니온 타입의 특정 속성을 기준으로 조회할 수도 있습니다.

이 챌린지에서는 유니온 타입 `Cat | Dog`에서 공통으로 사용하는 `type` 필드를 기준으로 해당하는 타입을 얻고자 합니다. 다시 말해서, 다음 예시에서는 `LookUp<Cat | Dog, 'dog'>`으로 `Dog` 타입을, `LookUp<Cat | Dog, 'cat'>`으로 `Cat` 타입을 얻을 수 있습니다.

</aside>

```tsx
{
  // 내 시도
  type LookUp<U extends Animal, T extends U["type"]> = U extends { type: T }
    ? U
    : never;

  interface Cat {
    type: "cat";
    breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
  }

  interface Dog {
    type: "dog";
    breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
    color: "brown" | "white" | "black";
  }

  type Animal = Cat | Dog;

  type MyDogType = LookUp<Cat | Dog, "dog">;
  type MyCatType = LookUp<Cat | Dog, "cat">;
}

{
  // 다른 시도
  type LookUp<U, T extends string> = {
    [K in T]: U extends { type: T } ? U : never;
  }[T];
}
```

- 내 시도
  - `<U extends Animal, T extends U["type"]>`
    - 특정 `string`으로 `U`를 추론해야 하기 때문에 `U`는 `Animal`을 `T`는 `Animal`의 `key`중 `“type”`을 받게 했다.
  - `U extends { type: T }`
    - `T`는 `U["type"]`에 매치되는 리터럴타입 이기 때문에 `extends { type: T }`로 `type`의 값이 `T`인 `U`를 찾았다.
- 다른 시도
  - `<U, T extends string>`
    - 조금 더 넓은 제너릭 타입을 받고
  - `{[K in T]: U extends { type: T } ? U : never}[T]`
    - `{dog: Dog}, {cat: Cat}` 이런식으로 만들고 뒤에 `[T]`를 통해 타입을 찾음.
