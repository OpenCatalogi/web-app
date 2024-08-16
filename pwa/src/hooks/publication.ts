import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IPublicationFiltersContext } from "../context/publicationFilters";

export const usePublication = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getOne = (publicationId: string) =>
    useQuery<any, Error>(["publications", publicationId], () => API?.Publication.getOne(publicationId), {
      initialData: () =>
        queryClient.getQueryData<any[]>("publications")?.find((_publication) => _publication.id === publicationId),
      onError: (error) => {
        throw new Error(error.message);
      },
      enabled: !!publicationId,
    });

  const getSearch = (filters: IPublicationFiltersContext, currentPage: number, limit: number) =>
    useQuery<any, Error>(
      ["publications", filters, currentPage, limit],
      () => API?.Publication.getSearch(filters, currentPage, limit),
      {
        onError: (error) => {
          throw new Error(error.message);
        },
      },
    );

  const getFilterOptions = () =>
    useQuery<any, Error>(["available_publication_catagories"], () => API?.Publication.getFilterOptions(), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { getOne, getSearch, getFilterOptions };
};
