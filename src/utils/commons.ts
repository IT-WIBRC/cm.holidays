export const regulariseSpacesFrom = (word: string, to = " "): string => {
  return word.trim().replace(/\s+/g, to);
};