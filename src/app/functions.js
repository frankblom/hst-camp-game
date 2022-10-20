export const answerSort = (a, b) => {
  if (!a || !a.label || !b || !b.label) return 0;
  if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
  if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
  return 0;
};
