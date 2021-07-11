const truncate = (input, maxCharacters) => {
  if (!input || input.length <= maxCharacters) return input;

  return `${input.substring(0, maxCharacters)}...`;
};

export { truncate };
