export interface Validatable {
  isValid(): boolean;
  validationErrors(): string[];
}
