import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFilters } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";

export default class Organization {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/organizations/${id}`);

    return data;
  };

  public getAll = async (filters: IFilters): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/organizations?page=${filters.currentPage}&limit=10&extend[]=all${filtersToQueryParams(filters)}`,
    );

    return data;
  };

  public filtersGetAll = async (): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/organizations?extend[]=all&limit=1000`);

    return data;
  };

  public getCount = async (filters: IFilters): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/organizations?limit=1${filtersToQueryParams(filters)}`);

    return data.total;
  };
}
