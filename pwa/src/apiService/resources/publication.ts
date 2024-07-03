import { Send } from "../apiService";
import { AxiosInstance } from "axios";

export default class Publication {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getContent = async (fileName: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", fileName);

    return data;
  };
}
