import { ComponentMetadataSchema } from '@/schemas';
import {
  ComponentMetadata,
  ValidationError,
  Result,
  success,
  failure,
  parseWithZod
} from '@healthcare-chat/core';

/**
 * Validate component metadata against the schema
 * @returns A Result containing either the validated metadata or a ValidationError
 */
export function validateComponentMetadata(data: unknown): Result<ComponentMetadata, ValidationError> {
  try {
    // Use the parseWithZod helper from core to validate with the schema
    const parseResult = parseWithZod(ComponentMetadataSchema, data);
    if (parseResult.isFailure) {
      return failure(
        new ValidationError(
          `Invalid component metadata: ${parseResult.error.message}`,
          {originalError: parseResult.error}
        )
      );
    }

    return success(parseResult.value as ComponentMetadata);
  } catch (error) {
    return failure(
      new ValidationError(
        `Failed to validate component metadata: ${error instanceof Error ? error.message : String(error)}`,
        {originalError: error}
      )
    );
  }
}
