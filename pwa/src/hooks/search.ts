import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFiltersContext } from "../context/filters";

export const useSearch = (_: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getSearch = (filters: IFiltersContext, limit: number) =>
    useQuery<any, Error>(["search", filters, limit], () => API?.Search.getSearch(filters, limit), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  return { getSearch };
};
