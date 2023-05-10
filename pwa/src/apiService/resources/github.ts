import { Send } from "../apiService";
import { AxiosInstance } from "axios";

export default class Github {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public postRepository = async (variables: { payload: any }): Promise<any> => {
    const { payload } = variables;

    const { data } = await Send(this._instance, "POST", "/github_events", payload);
    return data;
  };
}
