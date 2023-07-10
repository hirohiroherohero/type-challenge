{
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
  type LookUp<U, T extends string> = {
    [K in T]: U extends { type: T } ? U : never;
  }[T];

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
