# Exclude

<aside>
๐ก `T`์์ย `U`์ ํ ๋นํ  ์ ์๋ ํ์์ ์ ์ธํ๋ ๋ด์ฅ ์ ๋ค๋ฆญย `Exclude<T, U>`๋ฅผ ์ด๋ฅผ ์ฌ์ฉํ์ง ์๊ณ  ๊ตฌํํ์ธ์

</aside>

```tsx
// ๋ด ์๋
{
    type MyExclude<T, U> = U extends T ? "T์์ U๋ฅผ ๋นผ์ค์ผ ํ๋๋ฐ...." : T;

    type Result = MyExclude<"a" | "b" | "c", "a">; // "T์์ U๋ฅผ ๋นผ์ค์ผ ํ๋๋ฐ...."
}

// ์ ๋ต ํ์ธ
{
    type MyExclude<T, U> = T extends U ? never : T;

    type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
}
```

-   ํด๊ฒฐ ๋ฐฉ๋ฒ
    -   ๋๋ `U (๋๋ฒ์งธ๋ก ๋ฃ๋ ํ์)` ์ด `T (์ฒซ๋ฒ์งธ๋ก ๋ฃ๋ ํ์)` ์ ๋ถ๋ถ์งํฉ์ด๋ฉด์ผ๋ก ์์ํ๋๋ฐ ์๋ชป๋๋ค.
        -   ๋น์ฐํ ๋ถ๋ถ์งํฉ์ด๋ `"T์์ U๋ฅผ ๋นผ์ค์ผ ํ๋๋ฐ...."` ๊ฐ ๋์ด..
    -   ์ด ๋ฌธ์ ์์ ๊ธฐ์ตํด์ผ ํ ๊ฒ!
        -   `T extends U ?` ์์ `T`๊ฐ ์ ๋ค๋ฆญ ํ์์ด๋ฉด ๋ถ๋ฐฐ๋ฒ์น์ด ์ ์ฉ๋๋ค!!!!
        -   ํ์ด์
            ![IMG_207067B386FD-1.jpeg](./img/IMG_207067B386FD-1.jpeg)
