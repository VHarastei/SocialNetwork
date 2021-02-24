type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) => (value ? undefined : 'Required');
export const maxLength = (max: number): ValidatorType => (value) =>
  value && value.length >= max ? `Maximum length is ${max} symbols` : undefined;

export const composeValidators = (...validators: Array<ValidatorType>) => (value: string) =>
  validators.reduce((error: any, validator) => error || validator(value), undefined);
