export const useRandomCardId = () => {
  const segment1 = Math.round(Math.random() * 0xffffffffffff).toString(16);
  const segment2 = Math.round(Math.random() * 0xffffffffffff).toString(16);
  return `${segment1}${segment2}`;
};
