export const call = <A extends readonly any[]>(...args: A) => <B>(
  f: (...args: A) => B
) => f(...args)
