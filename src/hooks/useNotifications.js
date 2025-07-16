import { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { loadUserSettings, saveUserSettings } from '../utils/storage';

export const useNotifications = () => {
  const [settings, setSettings] = useState(loadUserSettings());
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    bridge.send('VKWebAppCheckNotificationAllowed')
      .then(() => setIsSupported(true))
      .catch(() => setIsSupported(false));
  }, []);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    saveUserSettings(newSettings);
    scheduleNotifications(newSettings);
  };

  const scheduleNotifications = async (notificationSettings) => {
    if (!notificationSettings.notificationsEnabled || !isSupported) return;

    try {
      await bridge.send('VKWebAppAllowNotifications');
      const [hours, minutes] = notificationSettings.notificationTime.split(':').map(Number);
      await bridge.send('VKWebAppShowNotification', {
        title: 'Время учить слова!',
        text: 'Не забывайте регулярно повторять слова для лучшего запоминания',
        action: { type: 'open_app', url: 'https://vk.com/app53893376' },
        time: { hour: hours, minute: minutes },
        repeat: true,
      });
    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  };

  return {
    notificationSettings: settings,
    updateNotificationSettings: updateSettings,
    isNotificationsSupported: isSupported,
  };
};