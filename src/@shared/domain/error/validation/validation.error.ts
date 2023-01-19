import { OutputValidator, OutputValidationError } from "@/@shared/domain/data/validator/validator.data";

export class ValidationError<Entity> extends Error {
  public errors: Array<OutputValidationError<Entity>>

  public constructor(outpuValidator: OutputValidator<Entity>) {
    super(outpuValidator.errors.join(", "));
    this.errors = outpuValidator.errors;
  }
}
