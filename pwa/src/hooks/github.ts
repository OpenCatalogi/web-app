import * as React from "react";
import { QueryClient, useMutation } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { addItem } from "../services/mutateQueries";
import { navigate } from "gatsby";

export const useGithub = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const postRepository = () =>
    useMutation<any, Error, any>([], API?.Github.postRepository, {
      onSuccess: async (newRepository) => {
        addItem(queryClient, "github", newRepository);
        navigate(`/components/${newRepository.component._self.id}`);
      },
      onError: (error) => {
        console.warn(error.message);
      },
    });

  return { postRepository };
};
