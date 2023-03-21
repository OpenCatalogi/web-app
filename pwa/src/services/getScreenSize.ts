import { TScreenSize } from "../context/gatsby";

export const getScreenSize = (screenSize: number): TScreenSize => {
	if (screenSize <= 576) return "mobile";
	if (screenSize <= 992) return "tablet";
	return "desktop";
};
