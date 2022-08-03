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
    } = await Send(this._instance, "GET", "/v1/referentielijsten/applicatiefuncties");

    return results;
  };

  public getBedrijfsfuncties = async (): Promise<any> => {
    const {
      data: { results },
    } = await Send(this._instance, "GET", "/v1/referentielijsten/bedrijfsfuncties");

    return results;
  };

  public getBedrijfsservices = async (): Promise<any> => {
    const {
      data: { results },
    } = await Send(this._instance, "GET", "/v1/referentielijsten/bedrijfsservices");

    return results;
  };

  public getReferentieComponents = async (): Promise<any> => {
    const {
      data: { results },
    } = await Send(this._instance, "GET", "/v1/referentielijsten/referentie_components");

    return results;
  };

  public getUpl = async (): Promise<any> => {
    const {
      data: { results },
    } = await Send(this._instance, "GET", "/v1/referentielijsten/upl");

    return results;
  };
}
