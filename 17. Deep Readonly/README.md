# Deep Readonly

<aside>
💡 객체의 프로퍼티와 모든 하위 객체를 재귀적으로 읽기 전용으로 설정하는 제네릭 `DeepReadonly<T>`를 구현하세요.

이 챌린지에서는 타입 파라미터 `T`를 객체 타입으로 제한하고 있습니다. 객체뿐만 아니라 배열, 함수, 클래스 등 가능한 다양한 형태의 타입 파라미터를 사용하도록 도전해 보세요.

</aside>

```tsx
{
  // 내 시도
  type X1 = {
    x: {
      a: 1;
      b: "hi";
    };
    y: "hey";
  };

  type X2 = {
    a: () => 22;
    b: string;
    c: {
      d: boolean;
      e: {
        g: {
          h: {
            i: true;
            j: "string";
          };
          k: "hello";
        };
        l: [
          "hi",
          {
            m: ["hey"];
          }
        ];
      };
    };
  };

  type X3 = { a: string } | { b: number };

  type LikeObject = { [x: string]: any };

  type DeepReadonly<T> = T extends LikeObject
    ? {
        readonly [key in keyof T]: T[key] extends LikeObject
          ? DeepReadonly<T[key]>
          : T[key];
      }
    : never;

  type Todo1 = DeepReadonly<X1>;
  type Todo2 = DeepReadonly<X2>;
  type Todo3 = DeepReadonly<X3>;
}

{
  // 정답
  type DeepReadonly<T> = keyof T extends never
    ? T
    : { readonly [k in keyof T]: DeepReadonly<T[k]> };
}
```

- 내 시도
  - `readonly`는 배열 및 튜플 리터럴 타입에만 허용되기 때문에 `T extends { [x: string]: any }` 를 사용하였다.
  - 프로퍼티 중 값이 `extends { [x: string]: any }` 면 재귀를 돌려 댑스를 내려가면서 `readonly`처리를 했다.
- 정답
  - `keyof T extends never`
    - `T`가 더 이상 객체가 아니면 재귀가 멈춘다.
  - `{ readonly [k in keyof T]: DeepReadonly<T[k]> }`
    - `value type`에 재귀함수를 넣어서 처리했다.
