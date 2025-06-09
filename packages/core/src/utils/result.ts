import { z } from 'zod';

/**
 * A type representing either a successful result with a value or a failure with an error
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Represents a successful operation with a value
 */
export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;
  
  constructor(readonly value: T) {}
  
  /**
   * Creates a new Success instance
   */
  static create<T>(value: T): Success<T> {
    return new Success(value);
  }
}

/**
 * Represents a failed operation with an error
 */
export class Failure<E> {
  readonly isSuccess = false;
  readonly isFailure = true;
  
  constructor(readonly error: E) {}
  
  /**
   * Creates a new Failure instance
   */
  static create<E>(error: E): Failure<E> {
    return new Failure(error);
  }
}

/**
 * Creates a Success result
 */
export const success = <T>(value: T): Success<T> => Success.create(value);

/**
 * Creates a Failure result
 */
export const failure = <E>(error: E): Failure<E> => Failure.create(error);

/**
 * Helper function to parse data with a Zod schema and return a Result
 */
export function parseWithZod<T>(schema: z.ZodType<T>, data: unknown): Result<T, z.ZodError> {
  const result = schema.safeParse(data);
  if (result.success) {
    return success(result.data);
  } else {
    return failure(result.error);
  }
}

/**
 * Executes a function that might throw and returns a Result
 */
export async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
  try {
    const value = await fn();
    return success(value);
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Synchronous version of tryCatch
 */
export function tryCatchSync<T>(fn: () => T): Result<T, Error> {
  try {
    const value = fn();
    return success(value);
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
}
