import axios, { AxiosInstance, AxiosResponse } from "axios";

import Case from "./resources/case";
import Component from "./resources/components";
import Message from "./resources/message";
import Organization from "./resources/organization";
import Applications from "./resources/applications";
import Search from "./resources/search";
import Github from "./resources/github";

import Login from "./services/login";
import Me from "./services/me";

export default class APIService {
  public JWT?: string;

  public removeAuthentication(): void {
    window.sessionStorage.removeItem("JWT");
    this.JWT = undefined;
  }

  public setAuthentication(_JWT: string): void {
    window.sessionStorage.setItem("JWT", _JWT);
    this.JWT = _JWT;
  }

  public get authenticated(): boolean {
    return this.JWT ? true : false;
  }

  public get apiClient(): AxiosInstance {
    const authorization = this.JWT ? { Authorization: "Bearer " + this.JWT } : {};

    return axios.create({
      baseURL: process.env.GATSBY_API_URL ?? undefined,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...authorization,
    });
  }

  public get LoginClient(): AxiosInstance {
    return axios.create({
      baseURL: process.env.GATSBY_API_URL ?? undefined,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  public get BaseClient(): AxiosInstance {
    return axios.create({
      baseURL: process.env.GATSBY_BASE_URL ?? undefined,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.JWT,
      },
    });
  }

  // Resources
  public get Case(): Case {
    return new Case(this.apiClient);
  }

  public get Message(): Message {
    return new Message(this.apiClient);
  }

  public get Component(): Component {
    return new Component(this.apiClient);
  }

  public get Organization(): Organization {
    return new Organization(this.apiClient);
  }

  public get Applications(): Applications {
    return new Applications(this.apiClient);
  }

  public get Search(): Search {
    return new Search(this.apiClient);
  }

  public get Github(): Github {
    return new Github(this.apiClient);
  }

  // Services
  public get Login(): Login {
    return new Login(this.LoginClient);
  }

  public get Me(): Me {
    return new Me(this.BaseClient);
  }
}

export const Send = (
  instance: AxiosInstance,
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  payload?: JSON,
): Promise<AxiosResponse> => {
  const _payload = JSON.stringify(payload);

  switch (method) {
    case "GET":
      return instance.get(endpoint);
    case "POST":
      return instance.post(endpoint, _payload);
    case "PUT":
      return instance.put(endpoint, _payload);
    case "DELETE":
      return instance.delete(endpoint);
  }
};
