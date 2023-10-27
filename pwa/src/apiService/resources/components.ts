import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFiltersContext } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";

export default class Component {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/components/${id}`);

    return data;
  };

  public getAll = async (filters: IFiltersContext): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/components?page=${filters.currentPage}&limit=10&extend[]=all${filtersToQueryParams(filters)}`,
    );

    return data;
  };

  public getCount = async (filters: IFiltersContext): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/components?limit=1${filtersToQueryParams(filters)}`);

    return data.total;
  };
}
