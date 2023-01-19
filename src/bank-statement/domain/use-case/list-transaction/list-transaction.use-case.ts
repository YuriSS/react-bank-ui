import {
  InputListTransactionDto,
  OutputRequestListTransaction,
} from "@/bank-statement/domain/use-case/list-transaction/list-transaction.use-case.type";
import { Request } from "@/@shared/domain/data/request/request.data";
import { Usecase } from "@/@shared/domain/use-case/use-case";
import { TransactionApi } from "@/bank-statement/domain/api/transaction/transaction.api";
import { Transaction } from "@/bank-statement/domain/entity/transaction/transaction.entity";
import { RawTransaction } from "@/bank-statement/domain/use-case/create-transaction/create-transaction.use-case.type";

export class ListTransactionUsecase implements Usecase<InputListTransactionDto, Promise<Transaction[]>> {
  public constructor(
    private request: Request,
    private api: TransactionApi,
    private createTransactionUsecase: Usecase<RawTransaction, Transaction>
  ) {}

  public async execute(params: InputListTransactionDto): Promise<Transaction[]> {
    const requestTransactionOutput = await this.request.get<InputListTransactionDto, OutputRequestListTransaction>(this.api.list, params);

    return requestTransactionOutput.transactions.map(
      (rawTransaction: RawTransaction): Transaction => this.createTransactionUsecase.execute(rawTransaction)
    );
  }
}

export class ListTransactionUsecaseFactory {
  public static create(request: Request, api: TransactionApi, createTransactionUsecase: Usecase<RawTransaction, Transaction>) {
    return new ListTransactionUsecase(request, api, createTransactionUsecase);
  }
}
