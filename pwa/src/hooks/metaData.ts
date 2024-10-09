import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useMetadata = () => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = (url: string) =>
    useQuery<any, Error>(["metadata"], () => API?.Metadata.getAll(url), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  return { getAll };
};
