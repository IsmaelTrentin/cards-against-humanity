export const removeDuplicates = <T = any>(array: T[]): T[] => {
  const current: T[] = [];
  array.forEach(e => {
    if (!current.includes(e)) {
      current.push(e);
    }
  });
  return current;
};
