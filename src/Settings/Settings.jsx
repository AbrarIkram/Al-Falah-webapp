import { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: false,
    },
    preferences: {
      language: 'english',
      theme: 'light',
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' or 'error'

  const handleToggle = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleSelect = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#4F200D] mb-2">Settings</h2>
        <p className="text-[#7A5C48]">Manage your account preferences and application settings</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Notifications Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E0D0C1] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E0D0C1] bg-[#FDF8F2]">
            <h3 className="text-lg font-semibold text-[#4F200D]">Notifications</h3>
            <p className="text-sm text-[#7A5C48] mt-1">Choose what notifications you want to receive</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#4F200D]">Email Notifications</p>
                <p className="text-sm text-[#A68A75]">Receive updates and announcements via email</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'email')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:ring-offset-2 ${
                  settings.notifications.email ? 'bg-[#FF9A00]' : 'bg-[#E0D0C1]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#4F200D]">Push Notifications</p>
                <p className="text-sm text-[#A68A75]">Get real-time alerts on your device</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'push')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:ring-offset-2 ${
                  settings.notifications.push ? 'bg-[#FF9A00]' : 'bg-[#E0D0C1]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E0D0C1] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E0D0C1] bg-[#FDF8F2]">
            <h3 className="text-lg font-semibold text-[#4F200D]">Preferences</h3>
            <p className="text-sm text-[#7A5C48] mt-1">Customize your experience</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#4F200D] mb-2">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handleSelect('preferences', 'language', e.target.value)}
                className="w-full px-4 py-2 border border-[#E0D0C1] rounded-lg bg-white text-[#4F200D] focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-transparent"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#4F200D] mb-2">Theme</label>
              <div className="flex gap-3">
                {['light', 'dark'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleSelect('preferences', 'theme', theme)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      settings.preferences.theme === theme
                        ? 'bg-[#FF9A00] text-white'
                        : 'bg-[#FDF8F2] text-[#4F200D] border border-[#E0D0C1] hover:bg-[#F6F1E9]'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E0D0C1] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E0D0C1] bg-[#FDF8F2]">
            <h3 className="text-lg font-semibold text-[#4F200D]">Privacy & Visibility</h3>
            <p className="text-sm text-[#7A5C48] mt-1">Control who can see your information</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#4F200D] mb-2">Profile Visibility</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handleSelect('privacy', 'profileVisibility', e.target.value)}
                className="w-full px-4 py-2 border border-[#E0D0C1] rounded-lg bg-white text-[#4F200D] focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-transparent"
              >
                <option value="public">Public - Anyone can view</option>
                <option value="alumni">Alumni Only - Only verified alumni</option>
                <option value="private">Private - Only you</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#4F200D]">Show Email Address</p>
                <p className="text-sm text-[#A68A75]">Display your email on your profile</p>
              </div>
              <button
                onClick={() => handleToggle('privacy', 'showEmail')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:ring-offset-2 ${
                  settings.privacy.showEmail ? 'bg-[#FF9A00]' : 'bg-[#E0D0C1]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-[#FF6B6B] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-red-50 border-b border-[#FF6B6B]">
            <h3 className="text-lg font-semibold text-[#FF6B6B]">Danger Zone</h3>
            <p className="text-sm text-[#FF6B6B] mt-1">Irreversible account actions</p>
          </div>
          <div className="p-6 bg-white">
            <button className="px-4 py-2 bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-lg transition-colors">
              Delete Account
            </button>
            <p className="text-xs text-[#A68A75] mt-2">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button with Status */}
      <div className="mt-8 sticky bottom-4 bg-white/95 backdrop-blur-sm border border-[#E0D0C1] rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            {saveStatus === 'success' && (
              <div className="flex items-center gap-2 text-[#4CAF50]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Settings saved successfully!</span>
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="flex items-center gap-2 text-[#FF6B6B]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm">Failed to save. Please try again.</span>
              </div>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 bg-[#FF9A00] hover:bg-[#E68A00] text-white rounded-lg transition-colors font-medium flex items-center gap-2 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;