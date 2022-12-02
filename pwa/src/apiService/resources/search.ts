import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFilters } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";

export default class Search {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getSearch = async (filters: IFilters): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/search/?page=${filters.currentPage}&limit=10&extend[]=all${filtersToQueryParams(filters, deletes)}`,
    );

    return data;
  };
}

const deletes = [
  { name: "resultDisplayLayout" },
  { name: "dependenciesDisplayLayout" },
  { name: "landingDisplayLayout" },
];
