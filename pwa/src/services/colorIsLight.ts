export const colorIsLight = (color: string): boolean => {
  const [R, G, B]: any = color.match(/\d+/g);

  return R * 0.299 + G * 0.587 + B * 0.114 > 186; // based on https://codepen.io/ikarium/pen/yXPQpo
};
