/**
 * Custom error classes for the Healthcare Chat UI Kit
 */

export class BaseError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = this.constructor.name;

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class ValidationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class ConfigurationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'CONFIG_ERROR', details);
  }
}

export class ComponentError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'COMPONENT_ERROR', details);
  }
}

export class NetworkError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details);
  }
}
