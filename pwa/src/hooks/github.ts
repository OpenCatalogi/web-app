import * as React from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { addItem } from "../services/mutateQueries";

export const useGithub = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const postRepository = () =>
    useMutation<any, Error, any>([], API?.Github.postRepository, {
      onSuccess: async (newRepository) => {
        addItem(queryClient, "github", newRepository);
        console.log("Succesfully posted");
      },
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { postRepository };
};
