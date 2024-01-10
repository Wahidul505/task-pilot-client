export const getSlicedText = (text: string, to: number, from: number) => {
  return text.slice(to, from) + "...";
};
