// Tタイプの配列を受け取って、Tの中にある要素(K)をキーと値にセットしたObjectを返却
export function stringToEnum<T extends string>(o: T[]): { [K in T]: K } {
  return o.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = currentValue
    return accumulator
  }, Object.create(null))
}
