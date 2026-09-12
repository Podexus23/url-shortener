import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod/v4';
import { ValidationError } from '../errors/AppError.js';

type Source = 'body' | 'query' | 'params';

export function validate<T>(schema: ZodType<T>, source: Source = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(
        new ValidationError(
          'Validation failed',
          result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }))
        )
      );
    }

    req[source] = result.data;
    next();
  };
}
