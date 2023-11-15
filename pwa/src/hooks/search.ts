import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFiltersContext } from "../context/filters";

export const useSearch = (_: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getSearch = (filters: IFiltersContext, currentPage: number, limit: number) =>
    useQuery<any, Error>(
      ["search", filters, currentPage, limit],
      () => API?.Search.getSearch(filters, currentPage, limit),
      {
        onError: (error) => {
          throw new Error(error.message);
        },
      },
    );

  const getCount = (filters: IFiltersContext) =>
    useQuery<any, Error>(["search_count", filters], () => API?.Search.getCount(filters), {
      onError: (error) => {
        throw new Error(error.message);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 10 * 1000, // 10 minutes
    });

  return { getSearch, getCount };
};
