import { Entity } from "@/@shared/domain/entity/entity";
import { Validation } from "@/@shared/domain/validation/validation";
import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";

export class Account extends Entity<InputAccountEntity, InputAccountEntity> {
  public constructor(fields: InputAccountEntity, validation: Validation<InputAccountEntity>) {
    super(fields, validation);
  }

  public get name(): string {
    return this._fields.name;
  }

  public get bank(): string {
    return this._fields.bank;
  }

  public get isLegalEntity(): boolean {
    return !!this._fields.isLegalEntity;
  }

  protected configureOutput(fields: InputAccountEntity): InputAccountEntity {
    return fields;
  }
}
