import { Money } from "@/bank-statement/domain/value-object/money/money.value-object";
import { CurrencyEnum } from "@/bank-statement/domain/value-object/money/money.value-object.type";

describe("Unit: Money value object", () => {
  it("should create an entity", () => {
    const input: Money = new Money({
      currency: CurrencyEnum.BRL,
      value: 300,
    });

    const valueObject = new Money(input);

    expect(valueObject.value).toBe(input.value);
    expect(valueObject.currency).toBe(input.currency);
  });
});
