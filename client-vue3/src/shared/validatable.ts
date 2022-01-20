export interface Validatable {
  isValid(): boolean;
  validate(): string[];
}
