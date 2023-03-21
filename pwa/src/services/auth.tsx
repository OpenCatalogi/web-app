import { navigate } from "gatsby-link";
import APIService from "../apiService/apiService";

export interface IUnvalidatedUser {
  username: string;
  password: string;
}

export const isBrowser = (): boolean => typeof window !== "undefined";

export const handleLogin = async (data: IUnvalidatedUser, API: APIService) => {
	if (!isBrowser()) return;

	API.setAuthentication("TEMPORARY-DUMMY-KEY");
	navigate("/admin");
};

export const isLoggedIn = (): boolean => {
	if (!isBrowser()) return false;
	return !!window.sessionStorage.getItem("JWT");
};

export const handleLogout = (API: APIService): void => {
	if (!isBrowser()) return;

	API.removeAuthentication();
	navigate("/");
};
