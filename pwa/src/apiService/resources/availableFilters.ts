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
    let endpoint =
      "/search?_queries[]=embedded.nl.embedded.commonground.layerType&_queries[]=embedded.nl.embedded.upl&_queries[]=embedded.url.embedded.organisation.name&_queries[]=categories&_queries[]=platforms&_queries[]=developmentStatus&_queries[]=embedded.maintenance.type&_queries[]=embedded.legal.license&_queries[]=embedded.nl.embedded.gemma.bedrijfsfuncties&_queries[]=softwareType&_queries[]=embedded.nl.embedded.gemma.bedrijfsservices&_queries[]=embedded.nl.embedded.gemma.referentieComponenten";

    if (process.env.GATSBY_FILTER_RATING === "Commonground") {
      endpoint += `&embedded.nl.embedded.commonground.rating[%3E%3D]=1`;
    }
    const { data } = await Send(this._instance, "GET", endpoint);

    return data;
  };
}
