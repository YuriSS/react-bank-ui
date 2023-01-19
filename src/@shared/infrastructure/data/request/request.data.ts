import { Request } from "@/@shared/domain/data/request/request.data";

export class FetchData implements Request {
  public async get<Input, Output>(url: string, params?: Input): Promise<Output> {
    const queryParams = new URLSearchParams(params || {});
    return fetch(url.concat(`?${queryParams}`)).then((response) => response.json());
  }
}
