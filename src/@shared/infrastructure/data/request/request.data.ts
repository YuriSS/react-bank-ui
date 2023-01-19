import { Request } from "@/@shared/domain/data/request/request.data";

export class Fetch implements Request {
  public async get<Input, Output>(url: string, params?: Input): Promise<Output> {
    const queryParams = new URLSearchParams(params || {});
    return fetch(url + queryParams)
      .then((response) => response.json());
  }

  public async post<Input, Output>(url: string, body?: Input): Promise<Output> {
    return fetch(url, { method: "POST", body: body as BodyInit | undefined })
      .then((response) => response.json());
  }

  public async put<Input, Output>(url: string, body?: Input): Promise<Output> {
    return fetch(url, { method: "PUT", body: body as BodyInit | undefined })
      .then((response) => response.json());
  }}
