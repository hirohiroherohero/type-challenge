{
    const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

    type TupleToObject<T extends readonly PropertyKey[]> = {
        [key in T[number]]: key;
    };

    // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
    type result = TupleToObject<typeof tuple>;
}
