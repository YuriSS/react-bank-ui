import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";

export interface InputAccountEntity {
  id: Identifier;
  name: string;
  bank: string;
  isLegalEntity?: boolean;
}
