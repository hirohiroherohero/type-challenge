{
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
  type DeepReadonly<T> = keyof T extends never
    ? T
    : { readonly [k in keyof T]: DeepReadonly<T[k]> };
}
