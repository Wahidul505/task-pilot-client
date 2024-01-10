export const getSlicedText = (text: string, index: number) => {
  const newText = text[index] ? text.slice(0, index) + "..." : text;
  return newText;
};
