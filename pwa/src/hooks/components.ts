import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFiltersContext } from "../context/filters";

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

  const getAll = (filters: IFiltersContext, currentPage: number) =>
    useQuery<any, Error>(["components", filters, currentPage], () => API?.Component.getAll(filters, currentPage), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  const getAllConfig = (applicationName: string) =>
    useQuery<any, Error>(["configComponents", applicationName], () => API?.Component.getAllConfig(applicationName), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  const getApplicationComponent = (applicationName: string) =>
    useQuery<any, Error>(
      ["applicationComponent", applicationName],
      () => API?.Component.getApplicationComponent(applicationName),
      {
        onError: (error) => {
          throw new Error(error.message);
        },
      },
    );

  return { getOne, getAll, getAllConfig, getApplicationComponent };
};
