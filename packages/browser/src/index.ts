import { add } from '@monitor/core';

type MyExclude<T, U> = T extends U ? never : T;
type res = MyExclude<'a' | 'b' | 'c', 'a'>;

export const reactive = () => {
  return add(1, 2);
};
