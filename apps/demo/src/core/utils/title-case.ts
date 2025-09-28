export const titleCase = (value: string) => {
  if (!value) return '';
  return value
    .toLowerCase()
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
};
