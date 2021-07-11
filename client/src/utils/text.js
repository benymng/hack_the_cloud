const truncate = (input, maxCharacters) => {
  if (input.length <= maxCharacters) return input;

  return `${input.substring(0, maxCharacters)}...`;
};

export { truncate };
