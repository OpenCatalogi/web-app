import { Send } from "../apiService";
import { AxiosInstance } from "axios";

export default class Markdown {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getContent = async (filePath: string): Promise<any> => {
    const { data } = await Send(this._instance, "GET", filePath);

    return data;
  };
}
