import { Usecase } from "@/@shared/domain/use-case/use-case";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { Account } from "@/bank-statement/domain/entity/account/account.entity";
import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";
import { RawAccount } from "@/bank-statement/domain/use-case/create-account/create-account.use-case.type";

export class CreateAccountUsecase implements Usecase<RawAccount, Account> {
  public constructor(private validation: ValidationUsecase<InputAccountEntity>) {}

  public execute(input: RawAccount): Account {
    const id = new Identifier({ id: input?.id });
    return new Account({ ...input, id }, this.validation);
  }
}

export class CreateAccountUsecaseFactory {
  public static create(validation: ValidationUsecase<InputAccountEntity>) {
    return new CreateAccountUsecase(validation);
  }
}
