export const getAchievements = () => [
  { id: 'first_group', title: 'Первая группа', description: 'Создайте свою первую группу карточек', unlocked: false, condition: g => g.length > 0, icon: '🎯' },
  { id: 'five_words', title: 'Словарный запас', description: 'Добавьте 5 слов в любую группу', unlocked: false, condition: g => g.some(x => x.words.length >= 5), icon: '📚' },
  { id: 'three_groups', title: 'Коллекционер', description: 'Создайте 3 группы карточек', unlocked: false, condition: g => g.length >= 3, icon: '🏆' },
  { id: 'master', title: 'Мастер слов', description: 'Выучите 10 слов (отметили как "знаю")', unlocked: false, condition: g => g.reduce((s, x) => s + x.words.filter(w => w.known).length, 0) >= 10, icon: '🌟' },
  { id: 'three_day_streak', title: 'Последователь', description: 'Занимайтесь 3 дня подряд', unlocked: false, condition: (_, stats) => stats.currentStreak >= 3, icon: '🔥' },
  { id: 'week_streak', title: 'Преданный ученик', description: 'Занимайтесь 7 дней подряд', unlocked: false, condition: (_, stats) => stats.currentStreak >= 7, icon: '🚀' },
];

export const checkAchievements = (groups, prev, stats) => {
  const base = getAchievements();
  return base.map(a => {
    const found = prev.find(x => x.id === a.id);
    if (found?.unlocked) return found;
    return { ...a, unlocked: a.condition(groups, stats) };
  });
};

export const calculateUserProgress = (groups, achievements) => {
  const totalWords = groups.reduce((s, g) => s + g.words.length, 0);
  const knownWords = groups.reduce((s, g) => s + g.words.filter(w => w.known).length, 0);

  const baseXp = knownWords * 10 + groups.length * 20;
  const achievementXp = achievements.filter(a => a.unlocked).length * 130;

  const totalXp = baseXp + achievementXp;
  let level = 1, xpToNext = 100, xpUsed = 0;

  while (totalXp >= xpToNext && level < 5) {
    xpUsed = xpToNext;
    level++;
    xpToNext += level * 150;
  }

  const currentXp = totalXp - xpUsed;
  const nextNeeded = xpToNext - xpUsed;

  return {
    level: level > 5 ? 5 : level,
    xp: currentXp,
    xpToNextLevel: nextNeeded,
    achievementsUnlocked: achievements.filter(a => a.unlocked).length,
    totalAchievements: achievements.length,
  };
};

