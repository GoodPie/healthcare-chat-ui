import {ComponentMetadataSchema, ComponentMetadata} from '@healthcare-chat/registry';

export function validateComponentMetadata(data: Record<string, unknown>): ComponentMetadata {
  try {
    // Use the zod schema from the registry package if available
    const parseResult = ComponentMetadataSchema.safeParse(data);
    if (!parseResult.success) {
      throw new Error(`Invalid component metadata: ${parseResult.error}`);
    }
    return parseResult.data;
  } catch (error: unknown) {
    // Fallback to basic validation if zod schema is not available
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid component metadata: not an object');
    }

    if (!data.name || typeof data.name !== 'string') {
      throw new Error('Invalid component metadata: missing or invalid name');
    }

    if (!Array.isArray(data.files)) {
      throw new Error('Invalid component metadata: files must be an array');
    }

    for (const file of data.files as Array<{name?: string, content?: string}>) {
      if (!file.name || !file.content) {
        throw new Error('Invalid component metadata: each file must have name and content');
      }
    }

    return data as ComponentMetadata;
  }
}
