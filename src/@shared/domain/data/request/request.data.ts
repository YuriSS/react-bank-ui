export interface Header {
  contentType?: string;
}

export interface Request {
  get: <Input, Output>(url: string, params?: Input, header?: Header) => Promise<Output>;
}

export interface Api {
  initialPath: string;
  version: string;
}
