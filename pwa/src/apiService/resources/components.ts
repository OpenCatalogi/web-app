import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFilters } from "../../context/filters";

export default class Component {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/components/${id}`);

    return data;
  };

  public getAll = async (filters: IFilters): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/components?page=${filters.currentPage}`);

    return data;
  };
}
