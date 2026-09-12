import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod/v4';

type Source = 'body' | 'query' | 'params';

export function validate<T>(schema: ZodType<T>, source: Source = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    req[source] = result.data;
    next();
  };
}
