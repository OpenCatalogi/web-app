import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useMarkdown = () => {
  const API: APIService | null = React.useContext(APIContext);

  const getContent = (filePath: string) =>
    useQuery<any, Error>(["contents", filePath], () => API?.Markdown.getContent(filePath), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { getContent };
};
