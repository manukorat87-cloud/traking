import { Request, Response, NextFunction } from 'express';
import { getSettingsCollection } from '../config/db.js';

const DEFAULT_SETTINGS = {
  brandName: 'Shopify Store',
  brandLogo: '',
  trackingPageTitle: 'Track Your Order',
  estimatedDeliveryDays: 7,
  trackingEnabledGlobal: true,
  hubsConfig: [
    { key: 'MUMBAI', label: 'Mumbai Hub' },
    { key: 'THANE', label: 'Thane Hub' },
    { key: 'BHIWANDI', label: 'Bhiwandi Hub' },
  ],
};

export async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const collection = await getSettingsCollection();
    const doc = await collection.findOne({ _id: 'app_settings' as any });

    const settings = doc ? { ...DEFAULT_SETTINGS, ...doc.settings } : DEFAULT_SETTINGS;

    return res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.json({
      success: true,
      data: DEFAULT_SETTINGS,
    });
  }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const newSettings = req.body;
    const collection = await getSettingsCollection();

    await collection.updateOne(
      { _id: 'app_settings' as any },
      { $set: { settings: newSettings, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    return res.json({
      success: true,
      data: { ...DEFAULT_SETTINGS, ...newSettings },
      message: 'Settings updated successfully.',
    });
  } catch (error) {
    next(error);
  }
}
