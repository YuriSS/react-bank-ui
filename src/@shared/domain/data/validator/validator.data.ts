export interface OutputValidationError<Entity> {
  message: string;
  key: keyof Entity;
  value: unknown;
}

export interface InputValidator<Entity> {
  key: keyof Entity;
}

export interface OutputValidator<Entity> {
  errors: Array<OutputValidationError<Entity>>;
}

export interface Validator<Entity> {
  minLength: (input: InputValidator<Entity> & { min: number }) => Validator<Entity>;
  maxLength: (input: InputValidator<Entity> & { max: number }) => Validator<Entity>;
  validate: (input: Entity) => OutputValidator<Entity>;
}
