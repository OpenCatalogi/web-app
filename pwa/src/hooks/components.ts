import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFilters } from "../context/filters";

export const useComponent = (queryClient: QueryClient) => {
	const API: APIService | null = React.useContext(APIContext);

	const getOne = (componentId: string) =>
		useQuery<any, Error>(["components", componentId], () => API?.Component.getOne(componentId), {
			initialData: () =>
				queryClient.getQueryData<any[]>("components")?.find((_component) => _component.id === componentId),
			onError: (error) => {
				throw new Error(error.message);
			},
			enabled: !!componentId,
		});

	const getAll = (filters: IFilters) =>
		useQuery<any, Error>(["components", filters], () => API?.Component.getAll(filters), {
			onError: (error) => {
				throw new Error(error.message);
			},
		});

	const getCount = (filters: IFilters) =>
		useQuery<any, Error>(["components_count", filters], () => API?.Component.getCount(filters), {
			onError: (error) => {
				throw new Error(error.message);
			},
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 60 * 10 * 1000, // 10 minutes
		});

	return { getOne, getAll, getCount };
};
