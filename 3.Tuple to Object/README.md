# Tuple to Object

<aside>
💡 배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

</aside>

```tsx
// 내 시도
{
    const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

    type TupleToObject<T extends readonly any[]> = {
        [key in T[number]]: T[key];
    };

    // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
    type result = TupleToObject<typeof tuple>;

    /**
		type result = {
		    tesla: unknown;
		    "model 3": unknown;
		    "model X": unknown;
		    "model Y": unknown;
		}
		*/
}

// 정답 확인
{
    const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

    type TupleToObject<T extends readonly any[]> = {
        [key in T[number]]: key;
    };

    // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
    type result = TupleToObject<typeof tuple>;
}
```

-   해결방법
    -   `{ [key in T[number]]: T[key] }` 로 했지만 예시 반환 타입을 잘 봤을때 `key` 가 들어가 있었다…
        -   `T[key]` 니까 당연히 `unknown` 이 뜨겠네.. 맞네..
    -   너무 급하게 하지말고 천천히 해야할듯….
