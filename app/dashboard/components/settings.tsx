"use client";

import { useState } from "react";
import {
  Notifications,
  Palette,
  Storage,
  Lock,
  CloudUpload,
  Save,
} from "@mui/icons-material";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    language: "en",
    theme: "light",
    timezone: "UTC",
    autoBackup: true,
    backupFrequency: "daily",
    twoFactorAuth: true,
    sessionTimeout: "30",
    allowAPIAccess: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1500);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      {/* Notifications Settings */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Notifications className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border-2 bg-gray-50">
            <div>
              <p className="font-semibold">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <button
              onClick={() => handleToggle("emailNotifications")}
              aria-label="Toggle email notifications"
              className={`w-16 h-7 border-2 rounded-xl relative transition-colors ${
                settings.emailNotifications ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-5 bg-white border-2 rounded-xl transition-all ${
                  settings.emailNotifications ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border-2 rounded-xl shadow-md bg-gray-50">
            <div>
              <p className="font-semibold">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive push notifications on your device</p>
            </div>
            <button
              onClick={() => handleToggle("pushNotifications")}
              aria-label="Toggle push notifications"
              className={`w-16 h-7 border-2 relative rounded-xl transition-colors ${
                settings.pushNotifications ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-5 bg-white border-2 rounded-xl transition-all ${
                  settings.pushNotifications ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border-2 rounded-xl shadow-md bg-gray-50">
            <div>
              <p className="font-semibold">Weekly Reports</p>
              <p className="text-sm text-gray-600">Receive weekly activity reports</p>
            </div>
            <button
              onClick={() => handleToggle("weeklyReports")}
              aria-label="Toggle weekly reports"
              className={`w-16 h-7 border-2 rounded-xl relative transition-colors ${
                settings.weeklyReports ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-5 bg-white border-2 rounded-xl transition-all ${
                  settings.weeklyReports ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white rounded-xl shadow-md border p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Appearance & Language</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange("language", e.target.value)}
              className="w-full px-4 py-3 border-2 bg-white rounded-xl shadow-md font-semibold"
            >
              <option value="en">English</option>
              <option value="ne">Nepali</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              className="w-full px-4 py-3 border-2 bg-white rounded-xl shadow-md font-semibold"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange("timezone", e.target.value)}
              className="w-full px-4 py-3 border-2 bg-white rounded-xl shadow-md font-semibold"
            >
              <option value="UTC">UTC</option>
              <option value="PST">PST</option>
              <option value="EST">EST</option>
              <option value="GMT">GMT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-white rounded-xl shadow-md border p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <Storage className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Backup & Storage</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border-2 bg-gray-50 rounded-xl shadow-md">
            <div>
              <p className="font-semibold">Automatic Backups</p>
              <p className="text-sm text-gray-600">Automatically backup your data</p>
            </div>
            <button
              onClick={() => handleToggle("autoBackup")}
              aria-label="Toggle automatic backups"
              className={`w-16 h-7 border-2 rounded-xl relative transition-colors ${
                settings.autoBackup ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-5 bg-white border-2 rounded-xl transition-all ${
                  settings.autoBackup ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
          <div>
            <label className="block font-semibold mb-2">Backup Frequency</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleChange("backupFrequency", e.target.value)}
              className="w-full px-4 py-3 border-2 bg-white rounded-xl shadow-md font-semibold"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button className="w-full px-6 py-3 bg-white rounded-xl shadow-md border-2 font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
            <CloudUpload /> Backup Now
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-md border p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border-2 bg-gray-50 rounded-xl shadow-md">
            <div>
              <p className="font-semibold">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add extra security to your account</p>
            </div>
            <button
              onClick={() => handleToggle("twoFactorAuth")}
              aria-label="Toggle two-factor authentication"
              className={`w-16 h-7 border-2 rounded-xl relative transition-colors ${
                settings.twoFactorAuth ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-5 bg-white border-2 rounded-xl transition-all ${
                  settings.twoFactorAuth ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border-2 bg-gray-50 rounded-xl shadow-md">
            <div>
              <p className="font-semibold">Allow API Access</p>
              <p className="text-sm text-gray-600">Enable third-party API access</p>
            </div>
            <button
              onClick={() => handleToggle("allowAPIAccess")}
              aria-label="Toggle API access"
              className={`w-16 h-7 border-2 rounded-xl relative transition-colors ${
                settings.allowAPIAccess ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-5 bg-white border-2 rounded-xl transition-all ${
                  settings.allowAPIAccess ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
          <div>
            <label className="block font-semibold mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleChange("sessionTimeout", e.target.value)}
              className="w-full px-4 py-3 border-2 bg-white rounded-xl shadow-md font-semibold"
              min="5"
              max="120"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-4 bg-white rounded-xl shadow-md border-2 text-black font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save />
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
