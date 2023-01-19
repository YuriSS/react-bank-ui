import { ValidationError } from "@/@shared/domain/error/validation/validation.error";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";
import { CreateAccountUsecaseFactory } from "@/bank-statement/domain/use-case/create-account/create-account.use-case";
import { RawAccount } from "@/bank-statement/domain/use-case/create-account/create-account.use-case.type";

describe("Unit: Create account use case", () => {
  it("should create an account", () => {
    const validation = {
      execute: jest.fn().mockReturnValue({ errors: [] }),
    } as unknown as ValidationUsecase<InputAccountEntity>;
    const rawAccount: RawAccount = {
      id: "1",
      bank: "Bank",
      name: "Test",
    };

    const account =
      CreateAccountUsecaseFactory.create(validation).execute(rawAccount);

    expect(account.name).toBe(rawAccount.name);
    expect(account.bank).toBe(rawAccount.bank);
    expect(account.id.value).toBe(rawAccount.id);
    expect(account.isLegalEntity).toBeFalsy();
    expect(validation.execute).toHaveBeenCalledTimes(1);
    expect(validation.execute).toHaveBeenCalledWith({
      id: new Identifier({ id: rawAccount.id }),
      bank: rawAccount.bank,
      name: rawAccount.name,
    });
  });

  it("should throw an error", () => {
    const validation = {
      execute: jest.fn().mockReturnValue({ errors: [{}] }),
    } as unknown as ValidationUsecase<InputAccountEntity>;
    const rawAccount = {} as RawAccount;

    expect(() => {
      CreateAccountUsecaseFactory.create(validation).execute(rawAccount);
    }).toThrowError(ValidationError);
  });
});
