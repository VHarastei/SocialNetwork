export const required = (value) => (value ? undefined : 'Required');
export const maxLength = (max) => (value) => 
value && value.length >= max ? `Maximum length is ${max} symbols` : undefined;
export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
