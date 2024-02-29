import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFiltersContext } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";

export default class Search {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getSearch = async (
    filters: IFiltersContext,
    currentPage: number,
    limit: number,
    ratingFilter: string,
  ): Promise<any> => {
    let endpoint = `/search?page=${currentPage}&limit=${limit}&extend[]=all${filtersToQueryParams(filters)}`;

    if (ratingFilter === "OpenCatalogi") {
      endpoint += `&embedded.rating.rating[>%3D]=${filters.rating}`;
    }

    if (filters.orderRating === true && ratingFilter === "OpenCatalogi") {
      endpoint += "&order[embedded.rating.rating]=desc";
    }

    if (ratingFilter === "Commonground") {
      endpoint += `&embedded.nl.embedded.commonground.rating[>%3D]=${filters.ratingCommonground}`;
    }

    if (filters.orderRating === true && ratingFilter === "Commonground") {
      endpoint += "&order[embedded.nl.embedded.commonground.rating]=desc";
    }

    if (filters.isForked === true) {
      endpoint += "&isBasedOn=IS NULL";
    }

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
