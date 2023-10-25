import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { getFileNameFromUrl } from "../services/FileNameFromUrl";
import { DEFAULT_HEADER_CONTENT_URL } from "../templates/templateParts/header/HeaderTemplate";

export const useHeaderContent = () => {
  const API: APIService | null = React.useContext(APIContext);

  const fileName = getFileNameFromUrl(
    process.env.GATSBY_HEADER_CONTENT !== undefined && process.env.GATSBY_HEADER_CONTENT.length !== 0
      ? process.env.GATSBY_HEADER_CONTENT
      : DEFAULT_HEADER_CONTENT_URL,
  );

  const getContent = () =>
    useQuery<any, Error>(["contents", fileName], () => API?.HeaderContent.getContent(fileName), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { getContent };
};
