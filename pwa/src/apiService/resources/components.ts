import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFilters } from "../../context/filters";

export default class Component {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    ``;
    const { data } = await Send(this._instance, "GET", `/components/${id}`);

    return data;
  };

  public getAll = async (filters: IFilters): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/components?page=${filters.currentPage}&extend[]=all${filtersToQueryParams(filters)}`,
    );

    return data;
  };
}

const filtersToQueryParams = (filters: any): string => {
  delete filters.resultDisplayLayout;

  let params: string = "";

  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue;

    if (typeof value === "string") {
      params += `&${key}=${value}`;
    }

    if (Array.isArray(value)) {
      let arrayParams = "";

      value.forEach((value) => {
        arrayParams += `&${key}[]=${value}`;
      });

      params += arrayParams;
    }
  }

  return params;
};
