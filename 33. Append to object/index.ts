{
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
