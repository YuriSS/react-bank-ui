export enum CurrencyEnum {
  BRL = "BRL",
  USD = "USD",
}

export interface InputMoneyEntity {
  currency: CurrencyEnum;
  value: number;
}
