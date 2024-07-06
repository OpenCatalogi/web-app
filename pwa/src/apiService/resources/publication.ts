import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFiltersContext } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";

export default class Publication {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/search/${id}?extend[]=all`);

    return data;
  };

  public getSearch = async (filters: IFiltersContext, currentPage: number, limit: number): Promise<any> => {
    let endpoint = `/search`;

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
}
