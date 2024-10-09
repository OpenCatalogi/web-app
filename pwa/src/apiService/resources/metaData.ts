import { Send } from "../apiService";
import { AxiosInstance } from "axios";

export default class Metadata {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getAll = async (url: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", `${url}/metadata`);

    return data;
  };
}
