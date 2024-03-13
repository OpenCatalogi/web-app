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
    const { data } = await Send(this._instance, "GET", `/components/${id}?extend[]=all`);

    return data;
  };

  public getAll = async (filters: IFiltersContext, currentPage: number): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/components?page=${currentPage}&limit=10&extend[]=all${filtersToQueryParams(filters)}`,
    );

    return data;
  };

  public getAllConfig = async (applicationName: string): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/components?extend[]=all&softwareType=configurationFiles&embedded.applicationSuite.name=${applicationName}`,
    );

    return data;
  };

  public getApplicationComponent = async (applicationName: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/components?extend[]=all&name=${applicationName}`);

    return data;
  };
}
