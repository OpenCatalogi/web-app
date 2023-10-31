import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFiltersContext } from "../../context/filters";

export default class Applications {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/applications/${id}`);

    return data;
  };

  public getAll = async (filters: IFiltersContext, limit: number): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/applications?page=${filters.applicationsCurrentPage}&limit=${limit}&extend[]=all`,
    );

    return data;
  };

  public getCount = async (filters: IFiltersContext): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/applications?limit=1`);

    return data.total;
  };
}
