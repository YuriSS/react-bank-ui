import { Entity } from "@/@shared/domain/entity/entity";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";

export class Account extends Entity<InputAccountEntity, InputAccountEntity> {
  public constructor(fields: InputAccountEntity, validation: ValidationUsecase<InputAccountEntity>) {
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
