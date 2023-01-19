import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";

export type RawAccount = Omit<InputAccountEntity, "id"> & {
  id: string;
}
