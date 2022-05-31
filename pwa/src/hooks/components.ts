import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useComponent = () => {
  const API: APIService = React.useContext(APIContext);

  const getAll = () =>
    useQuery<any, Error>("components", () => API.Component.getAll(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  return { getAll };
};
