//This function checks if the string contains HTML code
export const isHtml = (data: string): boolean => {
  const hmlRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;

  return hmlRegex.test(data);
};
