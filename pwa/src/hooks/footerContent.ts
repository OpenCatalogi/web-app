import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { getFileNameFromUrl } from "../services/FileNameFromUrl";
import { DEFAULT_FOOTER_CONTENT_URL } from "../templates/templateParts/footer/FooterTemplate";

export const useFooterContent = () => {
  const API: APIService | null = React.useContext(APIContext);

  const fileName = getFileNameFromUrl(window.sessionStorage.getItem("FOOTER_CONTENT") ?? DEFAULT_FOOTER_CONTENT_URL);

  const getContent = () =>
    useQuery<any, Error>(["contents", fileName], () => API?.FooterContent.getContent(fileName), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { getContent };
};
