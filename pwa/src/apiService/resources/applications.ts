import { Send } from "../apiService";
import { AxiosInstance } from "axios";
import { IFilters } from "../../context/filters";

export default class Applications {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/applications/${id}`);

    return data;
  };

  public getAll = async (filters: IFilters): Promise<any> => {
    const { data } = await Send(
      this._instance,
      "GET",
      `/applications?page=${filters.currentPage}&limit=9&extend[]=all`,
    );

    return data;
  };
}

const deletes = [
  { name: "resultDisplayLayout" },
  { name: "dependenciesDisplayLayout" },
  { name: "landingDisplayLayout" },
];
