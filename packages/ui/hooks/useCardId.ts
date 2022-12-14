export const useCardIdToReadable = (hexId: string) => {
  if (hexId.length !== 24) {
    console.warn(
      `useCardIdToReadable: provided hexId is not 24 characters Object id [${hexId}]`
    );
    return undefined;
  }
  const digits: string[] = [];
  let step = 0;

  while (digits.length < 12) {
    digits.push(hexId.substring(step, step + 2));
    step += 2;
  }

  const base36Digits = digits.map(d => parseInt(d, 16).toString(36));
  return base36Digits.join('');
};
