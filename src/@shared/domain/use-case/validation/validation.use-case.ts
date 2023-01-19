import { Usecase } from "@/@shared/domain/use-case/use-case";
import { OutputValidator, Validator } from "@/@shared/domain/data/validator/validator.data";

export abstract class ValidationUsecase<Entity> implements Usecase<Entity, OutputValidator<Entity>> {
  public constructor(protected validator: Validator<Entity>) {}

  public execute(input: Entity): OutputValidator<Entity> {
    return this.configureValidation().validate(input);
  }

  protected abstract configureValidation(): Validator<Entity>;

  protected resultInValidator(): Validator<Entity> {
    return this.validator;
  }
}

export class FakeValidationUsecase<T> extends ValidationUsecase<T> {
  public constructor(validator: Validator<T>) {
    super(validator);
  }

  protected configureValidation(): Validator<T> {
    return this.validator;
  }
}
