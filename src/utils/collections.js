export const countByPredicate = (arr, predicate) => {
  return arr.reduce((acc, v) => predicate(v) ? acc + 1 : acc, 0);
}
