{
    type Concat<
        T1 extends unknown[],
        T2 extends unknown[]
    > = T1 extends (infer R1)[]
        ? T2 extends (infer R2)[]
            ? [R1, R2]
            : never
        : never;

    type Result = Concat<[1, 2, 3], [4, 5, 6]>; // expected to be [1, 2]

    type Concat2<T extends unknown[], U extends unknown[]> = [...T, ...U];

    type Result2 = Concat2<[1, 2, 3], [4, 5, 6]>; // expected to be [1, 2]
}
