import { Transaction } from "@/bank-statement/domain/entity/transaction/transaction.entity";
import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";

export interface InputListTransactionDto {}

export interface OutputListTransactionDto {
  transactions: Array<Transaction>;
}

export interface OutputRequestListTransaction {
  transactions: Array<InputTransactionEntity>;
}
