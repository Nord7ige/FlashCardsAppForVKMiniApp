//Работает (15.07.2025 12:28)

/*

import { useState, useEffect } from 'react';
import {
  loadCardGroups,
  saveCardGroups,
  updateStreak
} from '../utils/storage';

export const useCardGroups = () => {
  const [cardGroups, setCardGroups] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [userStats, setUserStats] = useState(updateStreak());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = loadCardGroups();
    setCardGroups(data);
    updateAchievements(data);
    setIsLoading(false);
  }, []);

  const addCardGroup = (name) => {
    const newGroup = {
      id: Date.now(),
      name,
      createdAt: new Date(),
      words: []
    };
    const updated = [...cardGroups, newGroup];
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const deleteCardGroup = (groupId) => {
    const updated = cardGroups.filter(group => group.id !== groupId);
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const addWordToGroup = (groupId, word) => {
    const updated = cardGroups.map(group =>
      group.id === groupId ? { ...group, words: [...group.words, word] } : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const markWord = (groupId, wordId) => {
    const updated = cardGroups.map(group =>
      group.id === groupId
        ? {
            ...group,
            words: group.words.map(word =>
              word.id === wordId ? { ...word, known: !word.known } : word
            )
          }
        : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const deleteWord = (groupId, wordId) => {
    const updated = cardGroups.map(group =>
      group.id === groupId
        ? { ...group, words: group.words.filter(word => word.id !== wordId) }
        : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const updateAchievements = (groups) => {
    const totalGroups = groups.length;
    const totalWords = groups.reduce((acc, g) => acc + g.words.length, 0);
    const knownWords = groups.reduce(
      (acc, g) => acc + g.words.filter(w => w.known).length,
      0
    );

    const unlocked = [];
    if (totalGroups >= 1) unlocked.push('Первая группа');
    if (totalWords >= 5) unlocked.push('Словарный запас');
    if (totalGroups >= 3) unlocked.push('Коллекционер');
    if (knownWords >= 10) unlocked.push('Мастер слов');
    if (userStats.currentStreak >= 3) unlocked.push('Последователь');
    if (userStats.currentStreak >= 7) unlocked.push('Преданный ученик');

    const xp = totalWords * 15 + knownWords * 45;  //тут были значения 5 и 10

    setUserStats(prev => ({
      ...prev,
      totalXp: xp
    }));

    setAchievements(unlocked);
  };

  return {
    cardGroups,
    achievements,
    userStats,
    isLoading,
    addCardGroup,
    deleteCardGroup,
    addWordToGroup,
    markWord,
    deleteWord
  };
};

*/


//Работает (15.07.2025 13:00)

/*

import { useState, useEffect } from 'react';
import {
  loadCardGroups,
  saveCardGroups,
  updateStreak,
  loadUserProgress,
  saveUserProgress
} from '../utils/storage';

export const useCardGroups = () => {
  const [cardGroups, setCardGroups] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [userStats, setUserStats] = useState(updateStreak());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = loadCardGroups();
    const progress = loadUserProgress();
    setCardGroups(data);
    updateAchievements(data, progress);
    setIsLoading(false);
  }, []);

  const persistProgress = (newAchievements, newXp) => {
    const current = loadUserProgress();
    const updated = {
      achievements: Array.from(new Set([...current.achievements, ...newAchievements])),
      totalXp: current.totalXp + newXp
    };
    saveUserProgress(updated);
    return updated;
  };

  const addCardGroup = (name) => {
    const newGroup = {
      id: Date.now(),
      name,
      createdAt: new Date(),
      words: []
    };
    const updated = [...cardGroups, newGroup];
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
    persistProgress(['Первая группа'], 20); // XP за группу
  };

  const deleteCardGroup = (groupId) => {
    const updated = cardGroups.filter(group => group.id !== groupId);
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const addWordToGroup = (groupId, word) => {
    const updated = cardGroups.map(group =>
      group.id === groupId ? { ...group, words: [...group.words, word] } : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
    persistProgress([], 15); // XP за слово
  };

  const markWord = (groupId, wordId) => {
    const updated = cardGroups.map(group =>
      group.id === groupId
        ? {
            ...group,
            words: group.words.map(word =>
              word.id === wordId ? { ...word, known: !word.known } : word
            )
          }
        : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const deleteWord = (groupId, wordId) => {
    const updated = cardGroups.map(group =>
      group.id === groupId
        ? { ...group, words: group.words.filter(word => word.id !== wordId) }
        : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    updateAchievements(updated);
  };

  const updateAchievements = (groups, progress = loadUserProgress()) => {
    const totalGroups = groups.length;
    const totalWords = groups.reduce((acc, g) => acc + g.words.length, 0);
    const knownWords = groups.reduce(
      (acc, g) => acc + g.words.filter(w => w.known).length,
      0
    );

    const unlocked = [...progress.achievements];

    if (totalGroups >= 1 && !unlocked.includes('Первая группа'))
      unlocked.push('Первая группа');
    if (totalWords >= 5 && !unlocked.includes('Словарный запас'))
      unlocked.push('Словарный запас');
    if (totalGroups >= 3 && !unlocked.includes('Коллекционер'))
      unlocked.push('Коллекционер');
    if (knownWords >= 10 && !unlocked.includes('Мастер слов'))
      unlocked.push('Мастер слов');
    if (userStats.currentStreak >= 3 && !unlocked.includes('Последователь'))
      unlocked.push('Последователь');
    if (userStats.currentStreak >= 7 && !unlocked.includes('Преданный ученик'))
      unlocked.push('Преданный ученик');

    const updatedProgress = { achievements: unlocked, totalXp: progress.totalXp };
    saveUserProgress(updatedProgress);

    setAchievements(unlocked);
    setUserStats(prev => ({ ...prev, totalXp: updatedProgress.totalXp }));
  };

  return {
    cardGroups,
    achievements,
    userStats,
    isLoading,
    addCardGroup,
    deleteCardGroup,
    addWordToGroup,
    markWord,
    deleteWord
  };
};

*/


import { useState, useEffect } from 'react';
import {
  loadCardGroups,
  saveCardGroups,
  updateStreak,
  loadUserProgress,
  saveUserProgress
} from '../utils/storage';

export const useCardGroups = () => {
  const [cardGroups, setCardGroups] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [userStats, setUserStats] = useState(() => {
    const streak = updateStreak();
    const progress = loadUserProgress();
    return { ...streak, totalXp: progress.totalXp || 0 };
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = loadCardGroups();
    const progress = loadUserProgress();
    setCardGroups(data);
    updateAchievements(data, progress);
    setIsLoading(false);
  }, []);

  const persistProgress = (newAchievements, xpGain) => {
    const current = loadUserProgress();
    const updated = {
      achievements: Array.from(new Set([...current.achievements, ...newAchievements])),
      totalXp: current.totalXp + xpGain
    };
    saveUserProgress(updated);
    setUserStats(prev => ({ ...prev, totalXp: updated.totalXp }));
    return updated;
  };

  const addCardGroup = (name) => {
    const newGroup = {
      id: Date.now(),
      name,
      createdAt: new Date(),
      words: []
    };
    const updated = [...cardGroups, newGroup];
    setCardGroups(updated);
    saveCardGroups(updated);
    const progress = persistProgress(['Первая группа'], 20); // XP за группу
    updateAchievements(updated, progress);
  };

  const deleteCardGroup = (groupId) => {
    const updated = cardGroups.filter(group => group.id !== groupId);
    setCardGroups(updated);
    saveCardGroups(updated);
    const progress = loadUserProgress();
    updateAchievements(updated, progress);
  };

  const addWordToGroup = (groupId, word) => {
    const updated = cardGroups.map(group =>
      group.id === groupId ? { ...group, words: [...group.words, word] } : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    const progress = persistProgress([], 15); // XP за слово
    updateAchievements(updated, progress);
  };

  const markWord = (groupId, wordId) => {
    const updated = cardGroups.map(group =>
      group.id === groupId
        ? {
            ...group,
            words: group.words.map(word =>
              word.id === wordId ? { ...word, known: !word.known } : word
            )
          }
        : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    const progress = loadUserProgress();
    updateAchievements(updated, progress);
  };

  const deleteWord = (groupId, wordId) => {
    const updated = cardGroups.map(group =>
      group.id === groupId
        ? { ...group, words: group.words.filter(word => word.id !== wordId) }
        : group
    );
    setCardGroups(updated);
    saveCardGroups(updated);
    const progress = loadUserProgress();
    updateAchievements(updated, progress);
  };

  const updateAchievements = (groups, progress = loadUserProgress()) => {
    const totalGroups = groups.length;
    const totalWords = groups.reduce((acc, g) => acc + g.words.length, 0);
    const knownWords = groups.reduce(
      (acc, g) => acc + g.words.filter(w => w.known).length,
      0
    );

    const unlocked = [...progress.achievements];

    if (totalGroups >= 1 && !unlocked.includes('Первая группа'))
      unlocked.push('Первая группа');
    if (totalWords >= 5 && !unlocked.includes('Словарный запас'))
      unlocked.push('Словарный запас');
    if (totalGroups >= 3 && !unlocked.includes('Коллекционер'))
      unlocked.push('Коллекционер');
    if (knownWords >= 10 && !unlocked.includes('Мастер слов'))
      unlocked.push('Мастер слов');
    if (userStats.currentStreak >= 3 && !unlocked.includes('Последователь'))
      unlocked.push('Последователь');
    if (userStats.currentStreak >= 7 && !unlocked.includes('Преданный ученик'))
      unlocked.push('Преданный ученик');

    const updatedProgress = {
      achievements: unlocked,
      totalXp: progress.totalXp
    };
    saveUserProgress(updatedProgress);

    setAchievements(unlocked);
    setUserStats(prev => ({ ...prev, totalXp: updatedProgress.totalXp }));
  };

  return {
    cardGroups,
    achievements,
    userStats,
    isLoading,
    addCardGroup,
    deleteCardGroup,
    addWordToGroup,
    markWord,
    deleteWord
  };
};
