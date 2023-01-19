import { Usecase } from "@/@shared/domain/use-case/use-case";
import { RawAccount } from "@/bank-statement/domain/use-case/create-account/create-account.use-case.type";
import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";
import { Transaction } from "@/bank-statement/domain/entity/transaction/transaction.entity";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { Account } from "@/bank-statement/domain/entity/account/account.entity";
import { Money } from "@/bank-statement/domain/value-object/money/money.value-object";
import { RawTransaction } from "@/bank-statement/domain/use-case/create-transaction/create-transaction.use-case.type";

export class CreateTransactionUsecase
  implements Usecase<RawTransaction, Transaction>
{
  public constructor(
    private transactionValidation: ValidationUsecase<InputTransactionEntity>,
    private createAccountUsecase: Usecase<RawAccount, Account>
  ) {}

  public execute(input: RawTransaction): Transaction {
    const id = new Identifier({ id: input?.id });
    const from = this.createAccountUsecase.execute(input?.from);
    const to = this.createAccountUsecase.execute(input?.to);
    const value = new Money({ currency: input?.value?.currency, value: input?.value?.value });

    return new Transaction({ ...input, id, from, to, value }, this.transactionValidation);
  }
}

export class CreateTransactionUsecaseFactory {
  public static create(
    transactionValidation: ValidationUsecase<InputTransactionEntity>,
    createAccountUsecase: Usecase<RawAccount, Account>
  ) {
    return new CreateTransactionUsecase(transactionValidation, createAccountUsecase);
  }
}
