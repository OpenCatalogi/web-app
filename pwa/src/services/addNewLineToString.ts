export const addNewLineToString = (string: string) => string.match(/.{1,25}(\s|$)/g)?.join("\n");
