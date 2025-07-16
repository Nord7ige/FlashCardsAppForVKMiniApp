import React, { useState } from 'react';
import { ModalCard, FormItem, Input, Button, Checkbox, Text } from '@vkontakte/vkui';

const SettingsModal = ({ visible, onClose, settings, onSave, isSupported }) => {
  const [tempSettings, setTempSettings] = useState(settings);

  React.useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(tempSettings);
    onClose();
  };

  if (!visible) return null;

  return (
    <ModalCard
      id="settings-modal"
      onClose={onClose}
      header="Настройки"
      actions={
        <Button size="l" mode="primary" onClick={handleSubmit}>
          Сохранить
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        {isSupported ? (
          <>
            <FormItem>
              <Checkbox
                checked={tempSettings.notificationsEnabled}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  notificationsEnabled: e.target.checked
                })}
              >
                Уведомления
              </Checkbox>
            </FormItem>
            {tempSettings.notificationsEnabled && (
              <FormItem top="Время напоминания">
                <Input
                  type="time"
                  value={tempSettings.notificationTime}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    notificationTime: e.target.value
                  })}
                />
              </FormItem>
            )}
          </>
        ) : (
          <Text style={{ color: '#99a2ad' }}>
            Уведомления не поддерживаются в вашей версии приложения
          </Text>
        )}
      </form>
    </ModalCard>
  );
};

export default SettingsModal;
