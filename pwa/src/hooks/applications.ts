import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFiltersContext } from "../context/filters";

export const useApplications = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = (filters: IFiltersContext, limit: number) =>
    useQuery<any, Error>(["applications", filters, limit], () => API?.Applications.getAll(filters, limit), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  const getOne = (applicationId: string) =>
    useQuery<any, Error>(["applications", applicationId], () => API?.Applications.getOne(applicationId), {
      initialData: () =>
        queryClient.getQueryData<any[]>("applications")?.find((_application) => _application.id === applicationId),
      onError: (error) => {
        throw new Error(error.message);
      },
      enabled: !!applicationId,
    });

  const getCount = (filters: IFiltersContext) =>
    useQuery<any, Error>(["applications_count", filters], () => API?.Applications.getCount(filters), {
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
