import { Validation } from "@/@shared/domain/validation/validation";
import { ValidationError } from "@/@shared/domain/error/validation/validation.error";
import { Identifier } from "@/@shared/domain/value-object/identifier/identifier.value-object";

interface InputFields {
  id: Identifier;
}

export abstract class Entity<Input extends InputFields, Output extends InputFields> {
  protected _fields: Output;

  public constructor(fields: Input, validator: Validation<Output>) {
    this._fields = this.configureOutput(fields);
    this.validateInput(validator);
  }

  public get id(): Identifier {
    return this._fields.id;
  }

  protected abstract configureOutput(fields: Input): Output;

  private validateInput(validator: Validation<Output>): void {
    const validationOutput = validator.execute(this._fields);

    if (validationOutput.errors.length) {
      throw new ValidationError(validationOutput);
    }
  }
}
