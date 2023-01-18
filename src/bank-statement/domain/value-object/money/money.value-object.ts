import {
  CurrencyEnum,
  InputMoneyEntity,
} from "@/bank-statement/domain/value-object/money/money.value-object.type";

export class Money {
  public constructor(private _fields: InputMoneyEntity) {}

  public get currency(): CurrencyEnum {
    return this._fields.currency;
  }

  public get value(): number {
    return this._fields.value;
  }
}
