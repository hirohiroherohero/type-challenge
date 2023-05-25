// 내 시도
// declare function PromiseAll<T extends [] | readonly unknown[]>(
//   values: T
// ): T extends [...infer R] | readonly [...infer R] ? R : never;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

const promiseAllTest = PromiseAll([promise1, promise2, promise3] as const); // expected to be `Promise<[number, 42, string]>`
const promiseAllTest1 = PromiseAll([1, 2, 3] as const); // expected to be `Promise<[1, 2, 3]>`
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const); // expected to be `Promise<[1, 2, number]>`
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]); // expected to be `Promise<[number, number, number]>`

declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;
