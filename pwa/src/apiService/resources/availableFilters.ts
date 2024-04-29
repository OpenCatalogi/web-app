import { Send } from "../apiService";
import { AxiosInstance } from "axios";

export default class AvailableFilters {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getStatistics = async (): Promise<any> => {
    const endpoint =
      "/search?embedded.nl.embedded.commonground.rating[%3E%3D]=1&_queries[]=developmentStatus&_queries[]=softwareType&_queries[]=categories&_queries[]=embedded.nl.embedded.commonground.rating&_queries[]=embedded.nl.embedded.commonground.layerType&_queries[]=embedded.url.embedded.organisation.name";

    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };

  public getFilterOptions = async (): Promise<any> => {
    const endpoint = "/search?_queries[]=categories";

    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };
}
