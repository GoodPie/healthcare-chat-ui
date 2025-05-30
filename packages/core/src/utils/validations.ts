import { z } from 'zod';
import { ValidationError } from './errors';

/**
 * Zod schemas for common string formats
 */
export const PascalCaseSchema = z.string().regex(
  /^[A-Z][a-zA-Z0-9]*$/,
  'Must be in PascalCase format (start with uppercase, alphanumeric only)'
);

export const KebabCaseSchema = z.string().regex(
  /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
  'Must be in kebab-case format (lowercase with hyphens)'
);

export const CamelCaseSchema = z.string().regex(
  /^[a-z][a-zA-Z0-9]*$/,
  'Must be in camelCase format (start with lowercase, alphanumeric only)'
);

/**
 * Validations for various string formats.
 * @param value - The string to validate
 * @param errorMessage - Optional custom error message
 */
export const validatePascalCase = (value: string, errorMessage?: string): void => {
  try {
    PascalCaseSchema.parse(value);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        errorMessage ?? `Invalid PascalCase format: ${value}. ${error.errors[0].message}`,
        error.format()
      );
    }
    throw error;
  }
};

/**
 * Validates if a string is in kebab-case format
 * @param value - The string to validate
 * @param errorMessage - Optional custom error message
 */
export const validateKebabCase = (value: string, errorMessage?: string): void => {
  try {
    KebabCaseSchema.parse(value);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        errorMessage ?? `Invalid kebab-case format: ${value}. ${error.errors[0].message}`,
        error.format()
      );
    }
    throw error;
  }
};

/**
 * Validates if a string is in camelCase format
 * @param value - The string to validate
 * @param errorMessage - Optional custom error message
 */
export const validateCamelCase = (value: string, errorMessage?: string): void => {
  try {
    CamelCaseSchema.parse(value);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        errorMessage ?? `Invalid camelCase format: ${value}. ${error.errors[0].message}`,
        error.format()
      );
    }
    throw error;
  }
};

/**
 * Validates if a string is not empty
 * @param value - The string to validate
 * @param fieldName - The name of the field being validated
 */
export const validateNotEmpty = (value: string, fieldName: string): void => {
  try {
    z.string().min(1, `${fieldName} cannot be empty`).parse(value);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `${fieldName} cannot be empty`,
        error.format()
      );
    }
    throw error;
  }
};

/**
 * Validates if an array is not empty
 * @param array - The array to validate
 * @param fieldName - The name of the field being validated
 */
export const validateArrayNotEmpty = <T>(array: T[], fieldName: string): void => {
  try {
    z.array(z.any()).min(1, `${fieldName} cannot be empty`).parse(array);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `${fieldName} cannot be empty`,
        error.format()
      );
    }
    throw error;
  }
};
