export const regulariseSpacesFrom = (word: string, to = " "): string => {
  return word.trim().replace(/\s+/g, to);
};

export const toCamelCase = (word: string): string => {
  const hasUnderScore = word.split("_").length > 1;
  if (hasUnderScore) {
    return word.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  }
  return `${word.slice(0,1).toUpperCase()}${word.slice(1).toLowerCase()}`;
};