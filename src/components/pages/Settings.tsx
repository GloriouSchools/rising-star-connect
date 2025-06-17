
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings as SettingsIcon, School, Bell, Database, Users, Palette, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Settings = () => {
  const { toast } = useToast();
  
  // Local storage keys
  const SETTINGS_KEY = 'school_settings';
  
  // Default settings
  const defaultSettings = {
    schoolName: 'Rising Star Junior School',
    academicYear: '2024',
    currentTerm: 'Term 2',
    gradeSystem: 'percentage',
    passGrade: 50,
    enableNotifications: true,
    enableSounds: true,
    autoSave: true,
    theme: 'light',
    language: 'en',
    sessionTimeout: 60,
    showWelcomeMessage: true,
    enableAutoBackup: true,
    backupFrequency: 'daily',
    maxStudentsPerClass: 40,
    enableParentAccess: true
  };

  const [settings, setSettings] = useState(defaultSettings);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      toast({
        title: "Settings Saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update a setting
  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(SETTINGS_KEY);
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'school-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <SettingsIcon className="h-6 w-6 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <School className="h-5 w-5" />
              <span>School Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input 
                id="schoolName" 
                value={settings.schoolName}
                onChange={(e) => updateSetting('schoolName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input 
                id="academicYear" 
                value={settings.academicYear}
                onChange={(e) => updateSetting('academicYear', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentTerm">Current Term</Label>
              <Select value={settings.currentTerm} onValueChange={(value) => updateSetting('currentTerm', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                  <SelectItem value="Term 3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Academic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Academic Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gradeSystem">Grading System</Label>
              <Select value={settings.gradeSystem} onValueChange={(value) => updateSetting('gradeSystem', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                  <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                  <SelectItem value="points">Points (1-10)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pass Grade: {settings.passGrade}%</Label>
              <Slider
                value={[settings.passGrade]}
                onValueChange={([value]) => updateSetting('passGrade', value)}
                min={30}
                max={80}
                step={5}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Students per Class: {settings.maxStudentsPerClass}</Label>
              <Slider
                value={[settings.maxStudentsPerClass]}
                onValueChange={([value]) => updateSetting('maxStudentsPerClass', value)}
                min={20}
                max={60}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>User Interface</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Welcome Message</Label>
                <p className="text-sm text-gray-600">Display welcome message on login</p>
              </div>
              <Switch 
                checked={settings.showWelcomeMessage}
                onCheckedChange={(checked) => updateSetting('showWelcomeMessage', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Sounds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications & Sounds</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Notifications</Label>
                <p className="text-sm text-gray-600">Show system notifications</p>
              </div>
              <Switch 
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => updateSetting('enableNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Sounds</Label>
                <p className="text-sm text-gray-600">Play notification sounds</p>
              </div>
              <Switch 
                checked={settings.enableSounds}
                onCheckedChange={(checked) => updateSetting('enableSounds', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Save</Label>
                <p className="text-sm text-gray-600">Automatically save changes</p>
              </div>
              <Switch 
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting('autoSave', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Session Timeout: {settings.sessionTimeout} minutes</Label>
              <Slider
                value={[settings.sessionTimeout]}
                onValueChange={([value]) => updateSetting('sessionTimeout', value)}
                min={15}
                max={120}
                step={15}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Parent Access</Label>
                <p className="text-sm text-gray-600">Allow parents to view student data</p>
              </div>
              <Switch 
                checked={settings.enableParentAccess}
                onCheckedChange={(checked) => updateSetting('enableParentAccess', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-gray-600">Automatically backup data locally</p>
              </div>
              <Switch 
                checked={settings.enableAutoBackup}
                onCheckedChange={(checked) => updateSetting('enableAutoBackup', checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={exportSettings} variant="outline">
                Export Settings
              </Button>
              <Button onClick={resetToDefaults} variant="outline">
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} size="lg">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
