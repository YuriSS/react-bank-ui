import { OutputValidator, ValidationErrorOutput } from "@/@shared/domain/validation/validation";

export class ValidationError<Entity> extends Error {
  public errors: Array<ValidationErrorOutput<Entity>>

  public constructor(outpuValidator: OutputValidator<Entity>) {
    super(outpuValidator.errors.join(", "));
    this.errors = outpuValidator.errors;
  }
}
