import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { getFileNameFromUrl } from "../services/FileNameFromUrl";
import { DEFAULT_HEADER_CONTENT_URL } from "../templates/templateParts/header/HeaderTemplate";

export const usePublication = () => {
  const API: APIService | null = React.useContext(APIContext);

  const fileName = getFileNameFromUrl(
    "https://raw.githubusercontent.com/ConductionNL/OpenCatalogApp/feature/AQ212-8/publicatie-modal/docs/dcat_example.json",
  );

  const getContent = () =>
    useQuery<any, Error>(["contents", fileName], () => API?.Publication.getContent(fileName), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { getContent };
};
