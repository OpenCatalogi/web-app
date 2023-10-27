import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFiltersContext } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";

export default class Search {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getSearch = async (filters: IFiltersContext): Promise<any> => {
    let endpoint = `/search?page=${
      filters.currentPage
    }&order[embedded.rating.rating]=desc&limit=10&extend[]=all${filtersToQueryParams(filters)}`;

    if (process.env.GATSBY_GITHUB_ORGANIZATION_URL) {
      endpoint += `&embedded.url.embedded.organisation.github=${process.env.GATSBY_GITHUB_ORGANIZATION_URL}`;
    }

    if (filters.isForked === true) {
      endpoint += `&isBasedOn=IS NULL`;
    }

    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };
}
