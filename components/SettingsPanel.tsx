"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Lock,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Mail,
  Smartphone,
  User,
  Trash2,
} from "lucide-react";
import Avatar from "./Avatar";
import { toast } from "sonner";
import { logoutAccount } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

interface SettingsPanelProps {
  user: User;
}

const SettingsPanel = ({ user }: SettingsPanelProps) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    transactions: true,
    payments: true,
    security: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    biometric: false,
    sessionTimeout: "30",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    currency: "USD",
    language: "en",
    timezone: "America/New_York",
  });

  const handleLogout = async () => {
    await logoutAccount();
    router.push("/sign-in");
    toast.success("Logged out successfully");
  };

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved`);
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion feature coming soon");
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Settings */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <Avatar
            name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
            email={user?.email}
            size="lg"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              defaultValue={user?.firstName}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              defaultValue={user?.lastName}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user?.email}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>
        </div>

        <Button onClick={() => handleSave("Profile")} className="mt-4">
          Save Changes
        </Button>
      </div>

      {/* Security Settings */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Security</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Switch
              id="twoFactor"
              checked={security.twoFactor}
              onCheckedChange={(checked) =>
                setSecurity({ ...security, twoFactor: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="biometric">Biometric Authentication</Label>
              <p className="text-sm text-gray-600">Use fingerprint or face ID</p>
            </div>
            <Switch
              id="biometric"
              checked={security.biometric}
              onCheckedChange={(checked) =>
                setSecurity({ ...security, biometric: checked })
              }
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={security.sessionTimeout}
              onChange={(e) =>
                setSecurity({ ...security, sessionTimeout: e.target.value })
              }
              className="mt-1 w-32"
            />
          </div>
        </div>

        <Button onClick={() => handleSave("Security")} className="mt-4">
          Save Security Settings
        </Button>
      </div>

      {/* Notifications */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotif">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              id="emailNotif"
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pushNotif">Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive push notifications</p>
            </div>
            <Switch
              id="pushNotif"
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, push: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="transactionNotif">Transaction Alerts</Label>
              <p className="text-sm text-gray-600">Get notified about transactions</p>
            </div>
            <Switch
              id="transactionNotif"
              checked={notifications.transactions}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, transactions: checked })
              }
            />
          </div>
        </div>

        <Button onClick={() => handleSave("Notifications")} className="mt-4">
          Save Notification Settings
        </Button>
      </div>

      {/* Preferences */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="darkMode">Dark Mode</Label>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <Switch
              id="darkMode"
              checked={preferences.darkMode}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, darkMode: checked })
              }
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={preferences.currency}
              onChange={(e) =>
                setPreferences({ ...preferences, currency: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              value={preferences.language}
              onChange={(e) =>
                setPreferences({ ...preferences, language: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>

        <Button onClick={() => handleSave("Preferences")} className="mt-4">
          Save Preferences
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Log Out
            </Button>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-sm font-medium text-red-900">
              Delete Account
            </p>
            <p className="mb-4 text-sm text-red-700">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

