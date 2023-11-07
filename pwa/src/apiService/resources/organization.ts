import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFiltersContext } from "../../context/filters";

export default class Organization {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/organizations/${id}`);

    return data;
  };

  public getAll = async (filters: IFiltersContext, currentPage: number, limit: number): Promise<any> => {
    let url = `/organizations?page=${currentPage}&order[owns]=desc&limit=${limit}&extend[]=all`;

    if (filters.organizationSearch) {
      url += `&_search=${filters.organizationSearch}`;
    }

    const { data } = await Send(this._instance, "GET", url);

    return data;
  };

  public filtersGetAll = async (): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/organizations?extend[]=all&limit=1000`);

    return data;
  };

  public getCount = async (): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/organizations?limit=1`);

    return data.total;
  };
}
