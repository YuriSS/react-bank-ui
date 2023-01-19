import { Transaction } from "@/bank-statement/domain/entity/transaction/transaction.entity";
import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";
import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";

export interface InputListTransactionDto {}

export interface OutputListTransactionDto {
  transactions: Transaction[];
}

export interface OutputRequestListTransaction {
  transactions: RawTransaction[];
}



