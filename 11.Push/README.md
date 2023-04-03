# Push

<aside>
💡 `Array.push`의 제네릭 버전을 구현하세요.

</aside>

```tsx
// 내 시도
{
  type Push<T extends readonly any[], U> = [...T, U];

  type Result = Push<[], 1>; // [1]
  type Result2 = Push<[1, 2], "3">; // [1, 2, '3']
  type Result3 = Push<["1", 2, "3"], boolean>; // ['1', 2, '3', boolean]
}

// 정답
{
  type Push<T extends readonly any[], U> = [...T, U];

  type Result = Push<[], 1>; // [1]
  type Result2 = Push<[1, 2], "3">; // [1, 2, '3']
  type Result3 = Push<["1", 2, "3"], boolean>; // ['1', 2, '3', boolean]
}
```

- 해결 방법
  - `Concat`에서 사용한 방법을 사용해서 해결!
