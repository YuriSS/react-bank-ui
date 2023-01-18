import { Api } from "@/@shared/domain/use-case/request/request.use-case";

export interface TransactionApi extends Api {
  list: string;
}
