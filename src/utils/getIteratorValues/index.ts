export const getIteratorValues = <T>(iterator: IterableIterator<T>): T[] => {
  const result: T[] = [];
  let iterable = iterator.next();
  while (!iterable.done) {
    result.push(iterable.value);
    iterable = iterator.next();
  }
  return result;
};
