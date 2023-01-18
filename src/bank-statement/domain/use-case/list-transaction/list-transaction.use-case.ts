import {
  InputListTransactionDto,
  OutputListTransactionDto,
  OutputRequestListTransaction,
} from "@/bank-statement/domain/use-case/list-transaction/list-transaction.use-case.type";
import { Request } from "@/@shared/domain/data/request/request.data";
import { Usecase } from "@/@shared/domain/use-case/use-case";
import { TransactionApi } from "@/bank-statement/domain/api/transaction/transaction.api";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";
import { Transaction } from "@/bank-statement/domain/entity/transaction/transaction.entity";

export class ListTransactionUsecase
  implements
    Usecase<InputListTransactionDto, Promise<OutputListTransactionDto>>
{
  public constructor(
    private request: Request,
    private api: TransactionApi,
    private validation: ValidationUsecase<InputTransactionEntity>
  ) {}

  public async execute(
    params: InputListTransactionDto
  ): Promise<OutputListTransactionDto> {
    const requestTransactionOutput = await this.request.get<
      InputListTransactionDto,
      OutputRequestListTransaction
    >(this.api.list, params);

    return {
      transactions: requestTransactionOutput.transactions.map(
        (rawTransaction: InputTransactionEntity): Transaction =>
          new Transaction(rawTransaction, this.validation)
      ),
    };
  }
}
