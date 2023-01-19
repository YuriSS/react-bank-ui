import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { Transaction } from "@/bank-statement/domain/entity/transaction/transaction.entity";
import { RawTransaction } from "@/bank-statement/domain/use-case/create-transaction/create-transaction.use-case.type";

export interface InputListTransactionDto {
  id: Identifier;
}

export interface OutputListTransactionDto {
  transactions: Transaction[];
}

export interface OutputRequestListTransaction {
  transactions: RawTransaction[];
}
