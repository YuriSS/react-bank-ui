import { Account } from "@/bank-statement/domain/entity/account/account.entity";
import { Money } from "@/bank-statement/domain/value-object/money/money.value-object";
import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";
import { Entity } from "@/@shared/domain/entity/entity";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";

export class Transaction extends Entity<InputTransactionEntity, InputTransactionEntity> {
  public constructor(fields: InputTransactionEntity, validation: ValidationUsecase<InputTransactionEntity>) {
    super(fields, validation);
  }

  public get from(): Account {
    return this._fields.from;
  }

  public get to(): Account {
    return this._fields.to;
  }

  public get value(): Money {
    return this._fields.value;
  }

  public get date(): Date {
    return this._fields.date;
  }

  protected configureOutput(fields: InputTransactionEntity): InputTransactionEntity {
    return fields;
  }
}
