export const getTokenValue = (tokenKey: string) => {
	return getComputedStyle(document.documentElement).getPropertyValue(tokenKey);
};
