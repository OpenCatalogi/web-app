import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFiltersContext } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";

export default class Search {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getSearch = async (filters: IFiltersContext, currentPage: number, limit: number): Promise<any> => {
    let endpoint = `/search?page=${currentPage}&order[_self.dateCreated]=desc&limit=${limit}&extend[]=all${filtersToQueryParams(
      filters,
    )}`;

    if (window.sessionStorage.getItem("GITHUB_ORGANIZATION_URL") !== "") {
      endpoint += `&embedded.url.embedded.organisation.github=${window.sessionStorage.getItem(
        "GITHUB_ORGANIZATION_URL",
      )}`;
    }

    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };

  public getCount = async (filters: IFiltersContext): Promise<any> => {
    let endpoint = `/search?limit=1${filtersToQueryParams(filters)}`;

    if (window.sessionStorage.getItem("GITHUB_ORGANIZATION_URL") !== "") {
      endpoint += `&embedded.url.embedded.organisation.github=${window.sessionStorage.getItem(
        "GITHUB_ORGANIZATION_URL",
      )}`;
    }

    const { data } = await Send(this._instance, "GET", endpoint);

    return data.total;
  };
}
