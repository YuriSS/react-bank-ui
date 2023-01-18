export interface InputIdentifier {
  id: string;
}

export class Identifier {
  public constructor(private _fields: InputIdentifier) {}

  public get value(): string {
    return this._fields.id;
  }
}
