import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IPublicationFiltersContext } from "../../context/publicationFilters";
import { filtersToPublicationsQueryParams } from "../../services/filtersToPublicationsQueryParams";

export default class Publication {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/search/${id}?extend[]=all`);

    return data;
  };

  public getSearch = async (filters: IPublicationFiltersContext): Promise<any> => {
    let endpoint = `/search${filtersToPublicationsQueryParams(filters)}`;

    if (
      window.sessionStorage.getItem("GITHUB_ORGANIZATION_URL") !== "" &&
      window.sessionStorage.getItem("GITHUB_ORGANIZATION_URL") !== "false"
    ) {
      endpoint += `&embedded.url.embedded.organisation.github=${window.sessionStorage.getItem(
        "GITHUB_ORGANIZATION_URL",
      )}`;
    }

    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };

  public getFilterOptions = async (): Promise<any> => {
    const endpoint = "/search?_queries[]=data.status&_queries[]=data.themes&_queries[]=attachments.type";

    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };
}
