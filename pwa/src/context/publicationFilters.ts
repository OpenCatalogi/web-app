import * as React from "react";
import { GlobalContext } from "./global";

export interface IPublicationFiltersContext {
  _search?: string;
  status?: string;
  "data.themes"?: string;
  "attachments.type"?: string;
}

export const defaultPublicationFiltersContext: IPublicationFiltersContext = {
  _search: "",
  status: "",
  "data.themes": "",
  "attachments.type": "",
};

export const usePublicationFiltersContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);

  const publicationFilters: IPublicationFiltersContext = globalContext.publicationFilters;

  const setPublicationFilters = (newPublicationFilters: IPublicationFiltersContext) => {
    setGlobalContext((oldGlobalContext) => ({
      ...oldGlobalContext,
      publicationFilters: newPublicationFilters,
    }));
  };

  return { setPublicationFilters, publicationFilters };
};
