import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('[Unhandled Server Error]', err);

  const status = err.status || err.statusCode || 500;
  const userMessage = err.userMessage || 'An unexpected error occurred. Please try again later.';

  res.status(status).json({
    success: false,
    error: err.name || 'ServerError',
    message: userMessage,
  });
}
