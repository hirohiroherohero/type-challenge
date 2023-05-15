declare const config: Chainable;

// 내 시도
type Chainable = {
  option<K extends string, V>(key: K, value: V): Chainable & { [key in K]: V };
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
