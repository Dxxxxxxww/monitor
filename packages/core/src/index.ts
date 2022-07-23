export const add = (a: number, b: number): number => {
  return a + b;
};
// test tree-shaking
export const reduce = (a: number, b: number) => {
  return a - b;
};
