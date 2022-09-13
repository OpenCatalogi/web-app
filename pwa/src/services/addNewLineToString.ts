export const addNewLineToString = (string: string) => {
  const newString = string.match(/.{1,25}(\s|$)/g);
  const newLineString = newString?.join("\n");
  return newLineString;
};
