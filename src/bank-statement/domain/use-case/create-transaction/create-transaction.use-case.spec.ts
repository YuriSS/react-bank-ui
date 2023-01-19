import { ValidationUsecase } from "@/@shared/domain/use-case/validation/validation.use-case";
import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";
import { InputTransactionEntity } from "@/bank-statement/domain/entity/transaction/transaction.entity.type";
import { CurrencyEnum } from "@/bank-statement/domain/value-object/money/money.value-object.type";
import { RawAccount } from "@/bank-statement/domain/use-case/create-account/create-account.use-case.type";
import { CreateTransactionUsecaseFactory } from "@/bank-statement/domain/use-case/create-transaction/create-transaction.use-case";
import { RawTransaction } from "@/bank-statement/domain/use-case/create-transaction/create-transaction.use-case.type";
import { ValidationError } from "@/@shared/domain/error/validation/validation.error";
import { CreateAccountUsecase } from "../create-account/create-account.use-case";

describe("Unit: Create transaction use case", () => {
  it("should create a transaction", () => {
    const transactionValidation = {
      execute: jest.fn().mockReturnValue({ errors: [] }),
    } as unknown as ValidationUsecase<InputTransactionEntity>;

    const createAccountUsecase = {
      execute: jest.fn().mockReturnValue({ id: "account" }),
    } as unknown as CreateAccountUsecase;

    const input: RawTransaction = {
      id: "2",
      to: {} as RawAccount,
      from: {} as RawAccount,
      date: new Date(),
      value: { currency: CurrencyEnum.BRL, value: 300 },
    };

    const output = CreateTransactionUsecaseFactory.create(transactionValidation, createAccountUsecase).execute(input);

    expect(output.id).toBeInstanceOf(Identifier);
    expect(output.id.value).toBe(input.id);
    expect(output.to).toEqual({ id: "account" });
    expect(output.from).toEqual({ id: "account" });
    expect(output.value.currency).toBe(input.value.currency);
    expect(output.value.value).toBe(input.value.value);
    expect(output.date).toBe(input.date);
  });

  it("should throw exception because transaction error", () => {
    const transactionValidation = {
      execute: jest.fn().mockReturnValue({ errors: [{}] }),
    } as unknown as ValidationUsecase<InputTransactionEntity>;

    const createAccountUsecase = {
      execute: jest.fn().mockReturnValue({ id: "account" }),
    } as unknown as CreateAccountUsecase;

    const input = {} as RawTransaction;

    expect(() => {
      CreateTransactionUsecaseFactory.create(transactionValidation, createAccountUsecase).execute(input);
    }).toThrowError(ValidationError);
  });
});
