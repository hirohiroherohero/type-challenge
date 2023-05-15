# Chainable Options

<aside>
💡 체인 가능 옵션은 일반적으로 Javascript에서 사용됩니다. 하지만 TypeScript로 전환하면 제대로 구현할 수 있나요?

이 챌린지에서는 `option(key, value)`과 `get()` 두가지 함수를 제공하는 객체(또는 클래스) 타입을 구현해야 합니다. 현재 타입을 `option`으로 지정된 키와 값으로 확장할 수 있고 `get`으로 최종 결과를 가져올 수 있어야 합니다.

문제를 해결하기 위해 js/ts 로직을 작성할 필요는 없습니다. 단지 타입 수준입니다.

`key`는 `string`만 허용하고 `value`는 무엇이든 될 수 있다고 가정합니다. 같은 `key`는 두 번 전달되지 않습니다.

</aside>

```tsx
{
  // 내 시도
  declare const config: Chainable;

  type Chainable = {
    option<K extends string, V>(
      key: K,
      value: V
    ): Chainable & { [key in K]: V };
    get(): ReturnType<Chainable["option"]>;
  };

  const result = config
    .option("foo", 123)
    .option("name", "type-challenges")
    .option("bar", { value: "Hello World" })
    .get();

  // 결과는 다음과 같습니다:
  interface Result {
    foo: number;
    name: string;
    bar: {
      value: string;
    };
  }
}

{
  // 정답
  type Chainable<T = {}> = {
    option<K extends string, V>(
      key: K,
      value: V
    ): Chainable<Omit<T, K> & Record<K, V>>;
    get(): T;
  };
}
```

- 내 시도
  - `{ [key in K]: V }`를 이용하여 타입 추론은 됐지만 누적(?) 되지 않는 문제가 있다.
    - 예를 들어 `{foo: number;}` 다음에 `.option("name", "type-challenges")`를 하면 `{name: string;}` 으로 덮어 씌어진다.
  - `Chainable &` 을 사용하여 `.option(), .get()` 함수를 사용할 수 있게 했다.
  - `get()`의 타입을 어떻게 해야할지 모르겠다.
    - `ReturnType<Chainable["option"]>;`를 했지만 `Chainable & {[x: string]: unknown;}`이 나온다.
- 정답
  - 체이닝 가능한 객체의 타입을 만들기 위해 `Chainable<T = {}>` 제네릭 `T`를 받게 했고 기본 타입으로 `{}`를 넣었다.
  - `Record<K, V>` 를 이용하여 `{K:V}` 형태의 타입을 만들었고 `Omit<T, K>` 을 통하여 기존에 `K`로 된 프로퍼티가 있을시 제거해줬다.
  - `get(): T;` 체이닝 된 객체의 타입을 그대로 `return` 해줬다.
  - `Chainable<Omit<T, K> & Record<K, V>>`
    - `Chainable` 로 타입을 감싸서 `T`를 유지하면서 `option(), get()`을 사용가능하게 했다.
