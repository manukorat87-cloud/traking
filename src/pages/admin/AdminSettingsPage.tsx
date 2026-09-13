import React, { useEffect, useState } from 'react';
import { Save, Check, Settings as SettingsIcon, Truck, MapPin } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { fetchSettings, updateSettings } from '../../services/api';
import { AppSettings } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
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
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const updated = await updateSettings(settings);
      setSettings(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h2>
          <p className="text-sm text-slate-500 mt-1">
            Configure customer tracking brand identity, logistics hubs, and timeline defaults.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {savedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center space-x-2">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Settings updated successfully!</span>
            </div>
          )}

          {/* Brand Customization */}
          <Card>
            <CardHeader className="flex items-center space-x-2.5 font-bold text-slate-900">
              <SettingsIcon className="h-5 w-5 text-brand-600" />
              <span>BRAND & UI CONFIGURATION</span>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Brand Name"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                placeholder="e.g. Shopify Store"
              />

              <Input
                label="Brand Logo URL (Optional)"
                value={settings.brandLogo}
                onChange={(e) => setSettings({ ...settings, brandLogo: e.target.value })}
                placeholder="https://example.com/logo.png"
              />

              <Input
                label="Public Tracking Page Title"
                value={settings.trackingPageTitle}
                onChange={(e) => setSettings({ ...settings, trackingPageTitle: e.target.value })}
                placeholder="Track Your Order"
              />
            </CardBody>
          </Card>

          {/* Delivery & Timeline Defaults */}
          <Card>
            <CardHeader className="flex items-center space-x-2.5 font-bold text-slate-900">
              <Truck className="h-5 w-5 text-brand-600" />
              <span>DELIVERY & TIMELINE SIMULATION</span>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Estimated Delivery Days"
                type="number"
                min={1}
                max={30}
                value={settings.estimatedDeliveryDays}
                onChange={(e) => setSettings({ ...settings, estimatedDeliveryDays: parseInt(e.target.value, 10) || 7 })}
              />

              <div className="pt-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.trackingEnabledGlobal}
                    onChange={(e) => setSettings({ ...settings, trackingEnabledGlobal: e.target.checked })}
                    className="h-4 w-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                  />
                  <span className="text-sm font-semibold text-slate-800">
                    Enable Public Tracking System globally
                  </span>
                </label>
              </div>
            </CardBody>
          </Card>

          {/* Hub Configuration */}
          <Card>
            <CardHeader className="flex items-center space-x-2.5 font-bold text-slate-900">
              <MapPin className="h-5 w-5 text-brand-600" />
              <span>CONFIGURABLE LOGISTICS HUBS</span>
            </CardHeader>
            <CardBody className="space-y-3">
              <p className="text-xs text-slate-500 mb-2">
                Routing hubs used in the 7-day delivery timeline simulation:
              </p>
              {settings.hubsConfig.map((hub, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs">
                  <span className="font-mono font-bold text-slate-600 w-24">{hub.key}:</span>
                  <span className="font-semibold text-slate-900">{hub.label}</span>
                </div>
              ))}
            </CardBody>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="lg" isLoading={isSaving}>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
