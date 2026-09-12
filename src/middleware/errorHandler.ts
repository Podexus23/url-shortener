import type { Request, Response } from 'express';
import { AppError, ValidationError } from '../errors/AppError.js';

interface ErrorResponse {
  status: 'error';
  message: string;
  details?: unknown;
}

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error('ERROR:', err);

  if (err instanceof AppError) {
    const response: ErrorResponse = {
      status: 'error',
      message: err.message,
    };

    if (err instanceof ValidationError) {
      response.details = err.details;
    }

    return res.status(err.statusCode).json(response);
  }

  const isProduction = process.env.NODE_ENV === 'production';
  return res.status(500).json({
    status: 'error',
    message: isProduction ? 'Smth went wrong' : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
