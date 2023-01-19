import { ValidationError } from "@/@shared/domain/error/validation/validation.error";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { Account } from "@/bank-statement/domain/entity/account/account.entity";
import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";

describe("Unit: Account entity", () => {
  const id = new Identifier({ id: "1" });

  it("should create an entity", () => {
    const validation = {
      execute: jest.fn().mockReturnValue({ errors: [] }),
    } as unknown as ValidationUsecase<InputAccountEntity>;

    const input: InputAccountEntity = {
      id,
      bank: "Bank",
      name: "User name",
    };

    const entity = new Account(input, validation);

    expect(entity.id).toBe(id);
    expect(entity.bank).toBe(input.bank);
    expect(entity.name).toBe(input.name);
    expect(validation.execute).toHaveBeenCalledTimes(1);
    expect(validation.execute).toHaveBeenCalledWith(input);
  });

  it("should throw an error", () => {
    const validation = {
      execute: jest.fn().mockReturnValue({ errors: [{}] }),
    } as unknown as ValidationUsecase<InputAccountEntity>;

    const input = {} as InputAccountEntity;

    const action = () => {
      new Account(input, validation);
    };

    expect(action).toThrowError(ValidationError);
  });
});
