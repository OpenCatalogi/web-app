import { Send } from "../apiService";
import { AxiosInstance } from "axios";

export default class Directory {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getOne = async (id: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/directory/${id}?extend[]=all`);

    return data;
  };

  public getAll = async (): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/directory`);

    return data;
  };

  public getMetadata = async (): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `/metadata`);

    return data;
  };

  public getFilterOptions = async (): Promise<any> => {
    const endpoint = "/search?_queries[]=data.status&_queries[]=data.themes&_queries[]=attachments.type";

    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };
}
