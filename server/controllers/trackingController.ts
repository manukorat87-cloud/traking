import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orderService.js';

export async function getPublicTracking(req: Request, res: Response, next: NextFunction) {
  try {
    const { trackingToken } = req.params;

    if (!trackingToken || trackingToken.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'INVALID_TOKEN',
        message: 'Tracking token is required.',
      });
    }

    const result = await orderService.getPublicTrackingByToken(trackingToken.trim());

    if ('error' in result) {
      const statusCode = result.error === 'DISABLED' ? 403 : 404;
      return res.status(statusCode).json({
        success: false,
        error: result.error,
        message: result.message,
      });
    }

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
