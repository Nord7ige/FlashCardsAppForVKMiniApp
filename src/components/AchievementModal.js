import React from 'react';
import { ModalCard, Div, Title, Text, Button } from '@vkontakte/vkui';

const AchievementModal = ({ visible = false, onClose = () => {}, achievements = [] }) => {
  if (!visible) return null;

  return (
    <ModalCard
      id="achievements-modal"
      onClose={onClose}
      header="Ваши достижения"
      actions={
        <Button 
          size="l" 
          onClick={() => {
            if (typeof onClose === 'function') {
              onClose();
            }
          }}
        >
          Закрыть
        </Button>
      }
    >
      <Div>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            style={{
              marginBottom: '16px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: achievement.unlocked ? '#f0f7ff' : '#f7f7f7',
              border: `1px solid ${achievement.unlocked ? '#3f8ae0' : '#e1e3e6'}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>{achievement.icon}</div>
              <div>
                <Title level="3" style={{ marginBottom: '4px' }}>
                  {achievement.title}
                  {!achievement.unlocked && (
                    <span style={{ color: '#99a2ad', marginLeft: '6px' }}>(заблокировано)</span>
                  )}
                </Title>
                <Text>{achievement.description}</Text>
              </div>
            </div>
          </div>
        ))}
      </Div>
    </ModalCard>
  );
};

export default AchievementModal;
