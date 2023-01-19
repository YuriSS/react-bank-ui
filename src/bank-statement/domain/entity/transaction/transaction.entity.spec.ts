import { ValidationError } from "@/@shared/domain/error/validation/validation.error";
import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { Money } from "@/bank-statement/domain/value-object/money/money.value-object";
import { CurrencyEnum } from "@/bank-statement/domain/value-object/money/money.value-object.type";
import { Account } from "@/bank-statement/domain/entity/account/account.entity";
import { InputAccountEntity } from "@/bank-statement/domain/entity/account/account.entity.type";
import { Transaction } from "@/bank-statement/domain/entity/transaction/transaction.entity";
import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";

describe("Unit: Transaction entity", () => {
  it("should create an entity", () => {
    const validation = {
      execute: jest.fn().mockReturnValue({ errors: [] }),
    } as unknown as ValidationUsecase<InputTransactionEntity>;

    const accountValidation = {
      execute: jest.fn().mockReturnValue({ errors: [] }),
    } as unknown as ValidationUsecase<InputAccountEntity>;

    const input: InputTransactionEntity = {
      id: new Identifier({ id: "1" }),
      value: new Money({ currency: CurrencyEnum.BRL, value: 300 }),
      date: new Date(),
      from: new Account(
        {
          id: new Identifier({ id: "2" }),
          bank: "Bank from",
          name: "From",
        },
        accountValidation
      ),
      to: new Account(
        {
          id: new Identifier({ id: "3" }),
          bank: "Bank to",
          name: "To",
        },
        accountValidation
      ),
    };

    const entity = new Transaction(input, validation);

    expect(entity.id).toBe(input.id);
    expect(entity.value).toBe(input.value);
    expect(entity.date).toBe(input.date);

    expect(entity.from.id).toBe(input.from.id);
    expect(entity.from.bank).toBe(input.from.bank);
    expect(entity.from.name).toBe(input.from.name);
    expect(entity.from.isLegalEntity).toBe(input.from.isLegalEntity);

    expect(entity.to.id).toBe(input.to.id);
    expect(entity.to.bank).toBe(input.to.bank);
    expect(entity.to.name).toBe(input.to.name);
    expect(entity.to.isLegalEntity).toBe(input.to.isLegalEntity);

    expect(validation.execute).toHaveBeenCalledTimes(1);
    expect(validation.execute).toHaveBeenCalledWith(input);
  });

  it("should throw an error", () => {
    const validation = {
      execute: jest.fn().mockReturnValue({ errors: [{}] }),
    } as unknown as ValidationUsecase<InputTransactionEntity>;

    const input = {} as InputTransactionEntity;

    const action = () => {
      new Transaction(input, validation);
    };

    expect(action).toThrowError(ValidationError);
  });
});
