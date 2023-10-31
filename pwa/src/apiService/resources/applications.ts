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

  public getAll = async (filters: IFiltersContext, currentPage: number): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/applications?page=${currentPage}&limit=10&extend[]=all`);

    return data;
  };
}
