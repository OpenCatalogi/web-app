export const getTokenValue = (tokenKey: string) => {
  const body = document.querySelector("body");
  const bodyToken = getComputedStyle(body!).getPropertyValue(tokenKey);
  const rootToken = getComputedStyle(document.documentElement).getPropertyValue(tokenKey);

  return bodyToken !== "" ? bodyToken : rootToken;
};
