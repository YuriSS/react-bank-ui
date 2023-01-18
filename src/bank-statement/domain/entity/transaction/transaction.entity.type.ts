import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { Account } from "@/bank-statement/domain/entity/account/account.entity";
import { Money } from "@/bank-statement/domain/value-object/money/money.value-object";

export interface InputTransactionEntity {
  id: Identifier;
  from: Account;
  to: Account;
  value: Money;
  date: Date;
}
