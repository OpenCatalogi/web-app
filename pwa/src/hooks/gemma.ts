import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useGemma = () => {
  const API: APIService | null = React.useContext(APIContext);

  const getApplicatiefuncties = () =>
    useQuery<any, Error>("applicatiefuncties", () => API?.Gemma.getApplicatiefuncties(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  const getBedrijfsfuncties = () =>
    useQuery<any, Error>("bedrijfsfuncties", () => API?.Gemma.getBedrijfsfuncties(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  return { getApplicatiefuncties, getBedrijfsfuncties };
};
