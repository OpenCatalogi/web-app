import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFiltersContext } from "../context/filters";

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

  const getAll = (filters: IFiltersContext, currentPage: number, limit: number) =>
    useQuery<any, Error>(
      ["organizations", filters, currentPage, limit],
      () => API?.Organization.getAll(filters, currentPage, limit),
      {
        onError: (error) => {
          throw new Error(error.message);
        },
      },
    );

  const filtersGetAll = () =>
    useQuery<any, Error>(["organizations"], () => API?.Organization.filtersGetAll(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  return { getOne, getAll, filtersGetAll };
};
