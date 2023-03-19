{
    type ExampleType = Promise<string>;

    type MyAwaited<T> = T extends Promise<infer R> ? R : never;

    type Result = MyAwaited<ExampleType>; // string
}
