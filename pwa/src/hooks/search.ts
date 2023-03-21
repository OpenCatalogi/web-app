import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFilters } from "../context/filters";

export const useSearch = (queryClient: QueryClient) => {
	const API: APIService | null = React.useContext(APIContext);

	const getSearch = (filters: IFilters) =>
		useQuery<any, Error>(["search", filters], () => API?.Search.getSearch(filters), {
			onError: (error) => {
				throw new Error(error.message);
			},
		});

	return { getSearch };
};
