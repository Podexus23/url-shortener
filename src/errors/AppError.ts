export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'source not found') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  public readonly details: unknown;
  constructor(message = 'Validation error', details?: unknown) {
    super(message, 400);
    this.details = details;
  }
}
