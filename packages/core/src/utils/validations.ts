export const validatePascalCase = (value: string, errorMessage?: string): void => {
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
    throw new Error(errorMessage ?? `Invalid PascalCase format: ${value}. It should start with an uppercase letter and contain only alphanumeric characters.`);
  }
}
