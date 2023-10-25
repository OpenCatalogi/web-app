import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useMarkdown = () => {
  const API: APIService | null = React.useContext(APIContext);

  const getContent = (filePath: string) =>
    useQuery<any, Error>({
      queryKey: ["contents", filePath],
      queryFn: () => API?.Markdown.getContent(filePath),
      onError: (error) => {
        console.warn(error.message);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      retryDelay: 2000,
      staleTime: 1000 * 60 * 60, // one hour
    });

  return { getContent };
};
