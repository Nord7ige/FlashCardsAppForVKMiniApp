//Работает (15.07.2025 12:46)

import React from 'react';
import { Progress, Div, Title } from '@vkontakte/vkui';

const ProgressBar = ({ progress, stats }) => {
  if (!progress || !stats) return null;

  const progressPercentage = Math.min(
    Math.round((progress.xp / progress.xpToNextLevel) * 100),
    100
  );

  return (
    <Div style={{ textAlign: 'center' }}>
      <Title level="3" style={{ marginBottom: '8px' }}>
        Уровень {progress.level}
      </Title>
      <Progress value={progressPercentage} style={{ marginBottom: '8px' }} />
      <div style={{ marginBottom: '12px' }}>
        {progress.xp}/{progress.xpToNextLevel} XP
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: '#3f8ae0' }}>
        <span>🔥</span>
        <span style={{ fontWeight: '500' }}>
          Стрик: {stats.currentStreak} {stats.currentStreak === 1 ? 'день' : 'дня'}
        </span>
        {stats.longestStreak > stats.currentStreak && (
          <span style={{ color: '#99a2ad', fontSize: '0.9em' }}>
            (рекорд: {stats.longestStreak})
          </span>
        )}
      </div>
    </Div>
  );
};

export default ProgressBar;
