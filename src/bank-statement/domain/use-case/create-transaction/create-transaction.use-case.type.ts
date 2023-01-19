import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";
import { RawAccount } from "@/bank-statement/domain/use-case/create-account/create-account.use-case.type";
import { CurrencyEnum } from "@/bank-statement/domain/value-object/money/money.value-object.type";

export type RawTransaction = Omit<
  InputTransactionEntity,
  "id" | "from" | "to" | "value"
> & {
  id: string;
  from: RawAccount;
  to: RawAccount;
  value: { currency: CurrencyEnum, value: number };
};
