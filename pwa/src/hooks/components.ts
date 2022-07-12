import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

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

  const getAll = () =>
    useQuery<any, Error>("components", () => API?.Component.getAll(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  return { getOne, getAll };
};
