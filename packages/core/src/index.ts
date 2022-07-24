export const add = (a: number, b: number): number => {
  return a + b;
};
// test tree-shaking
export const reduce = (a: number, b: number) => {
  return a - b;
};

export type MyExclude<T, U> = T extends U ? never : T;
export type resType = MyExclude<'a' | 'b' | 'c', 'a'>;

export const res: resType = 'b'
console.log(res);
