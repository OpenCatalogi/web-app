import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useDirectory = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getOne = (directoryId: string) =>
    useQuery<any, Error>(["directories", directoryId], () => API?.Directory.getOne(directoryId), {
      initialData: () =>
        queryClient.getQueryData<any[]>("directories")?.find((_directory) => _directory.id === directoryId),
      onError: (error) => {
        throw new Error(error.message);
      },
      enabled: !!directoryId,
    });
  const getAll = () =>
    useQuery<any, Error>(["directories"], () => API?.Directory.getAll(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  const getMetadata = () =>
    useQuery<any, Error>(["directories", "metadata"], () => API?.Directory.getMetadata(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  const getFilterOptions = () =>
    useQuery<any, Error>(["available_publication_catagories"], () => API?.Directory.getFilterOptions(), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { getOne, getAll, getFilterOptions, getMetadata };
};
