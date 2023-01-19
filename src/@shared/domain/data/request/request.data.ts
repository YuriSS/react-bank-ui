export enum RequestMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export interface Header {
  contentType?: string;
}

export interface Request {
  get: <Input, Output>(url: string, params?: Input, header?: Header) => Promise<Output>;
  post: <Input, Output>(url: string, body: Input, header?: Header) => Promise<Output>;
  put: <Input, Output>(url: string, body: Input, header?: Header) => Promise<Output>;
}

export interface Api {
  initialPath: string;
  version: string;
}
