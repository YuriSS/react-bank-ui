import { Money } from "./money.value-object";
import { CurrencyEnum } from "./money.value-object.type";

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
