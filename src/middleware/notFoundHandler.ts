import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/AppError.js';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Path ${req.originalUrl} not found`));
};
