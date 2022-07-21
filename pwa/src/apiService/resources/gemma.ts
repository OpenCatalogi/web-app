import { Send } from "../apiService";
import { AxiosInstance } from "axios";

export default class Gemma {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getApplicatiefuncties = async (): Promise<any> => {
    const {
      data: { results },
    } = await Send(this._instance, "GET", "/v1/referentielijsten/applicatiefuncties?limit=1000");

    return results;
  };

  public getBedrijfsfuncties = async (): Promise<any> => {
    const {
      data: { results },
    } = await Send(this._instance, "GET", "/v1/referentielijsten/bedrijfsfuncties?limit=1000");

    return results;
  };
}
