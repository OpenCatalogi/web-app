import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFilters } from "../context/filters";

export const useOrganization = (queryClient: QueryClient) => {
	const API: APIService | null = React.useContext(APIContext);

	const getOne = (organizationId: string) =>
		useQuery<any, Error>(["organizations", organizationId], () => API?.Organization.getOne(organizationId), {
			initialData: () =>
				queryClient.getQueryData<any[]>("organizations")?.find((_organization) => _organization.id === organizationId),
			onError: (error) => {
				throw new Error(error.message);
			},
			enabled: !!organizationId,
		});

	const getAll = (filters: IFilters) =>
		useQuery<any, Error>(["organizations", filters], () => API?.Organization.getAll(filters), {
			onError: (error) => {
				throw new Error(error.message);
			},
		});

	const filtersGetAll = () =>
		useQuery<any, Error>(["organizations"], () => API?.Organization.filtersGetAll(), {
			onError: (error) => {
				throw new Error(error.message);
			},
		});

	const getCount = (filters: IFilters) =>
		useQuery<any, Error>(["organizations_count", filters], () => API?.Organization.getCount(filters), {
			onError: (error) => {
				throw new Error(error.message);
			},
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 60 * 10 * 1000, // 10 minutes
		});

	return { getOne, getAll, getCount, filtersGetAll };
};
