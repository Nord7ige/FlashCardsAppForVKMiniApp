//Работает (15.07.2025 12:28)


/*
const STORAGE_KEY = 'vk_flashcards_data';
const SETTINGS_KEY = 'vk_flashcards_settings';
const STATS_KEY = 'vk_flashcards_stats';

export const saveCardGroups = (groups) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(groups)); }
  catch (e) { console.error(e); }
};

export const loadCardGroups = () => {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    if (d) {
      const parsed = JSON.parse(d);
      return parsed.map(g => ({
        ...g,
        createdAt: new Date(g.createdAt),
        words: g.words.map(w => ({
          ...w,
          lastShown: w.lastShown ? new Date(w.lastShown) : undefined
        }))
      }));
    }
  } catch (e) { console.error(e); }
  return [];
};

export const loadUserSettings = () => {
  try {
    const d = localStorage.getItem(SETTINGS_KEY);
    return d ? JSON.parse(d) : { notificationsEnabled: false, notificationTime: '20:00' };
  } catch (e) { console.error(e); return { notificationsEnabled: false, notificationTime: '20:00' }; }
};

export const saveUserSettings = (s) => {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }
  catch (e) { console.error(e); }
};

export const loadUserStats = () => {
  try { const d = localStorage.getItem(STATS_KEY); return d ? JSON.parse(d) : { lastLoginDate: '', currentStreak: 0, longestStreak: 0 }; }
  catch (e) { console.error(e); return { lastLoginDate: '', currentStreak: 0, longestStreak: 0 }; }
};

export const saveUserStats = (s) => {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }
  catch (e) { console.error(e); }
};

export const updateStreak = () => {
  const stats = loadUserStats();
  const today = new Date().toISOString().slice(0,10);
  if (stats.lastLoginDate === today) return stats;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
  const ys = yesterday.toISOString().slice(0,10);
  let newStats;
  if (stats.lastLoginDate === ys) {
    const cs = stats.currentStreak + 1;
    newStats = { lastLoginDate: today, currentStreak: cs, longestStreak: Math.max(cs, stats.longestStreak) };
  } else if (!stats.lastLoginDate) {
    newStats = { lastLoginDate: today, currentStreak: 1, longestStreak: 1 };
  } else {
    newStats = { lastLoginDate: today, currentStreak: 1, longestStreak: stats.longestStreak };
  }
  saveUserStats(newStats);
  return newStats;
};

*/

const STORAGE_KEY = 'vk_flashcards_data';
const SETTINGS_KEY = 'vk_flashcards_settings';
const STATS_KEY = 'vk_flashcards_stats';
const PROGRESS_KEY = 'vk_flashcards_progress';

export const saveCardGroups = (groups) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  } catch (e) {
    console.error(e);
  }
};

export const loadCardGroups = () => {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    if (d) {
      const parsed = JSON.parse(d);
      return parsed.map(g => ({
        ...g,
        createdAt: new Date(g.createdAt),
        words: g.words.map(w => ({
          ...w,
          lastShown: w.lastShown ? new Date(w.lastShown) : undefined
        }))
      }));
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const loadUserSettings = () => {
  try {
    const d = localStorage.getItem(SETTINGS_KEY);
    return d
      ? JSON.parse(d)
      : { notificationsEnabled: false, notificationTime: '20:00' };
  } catch (e) {
    console.error(e);
    return { notificationsEnabled: false, notificationTime: '20:00' };
  }
};

export const saveUserSettings = (s) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch (e) {
    console.error(e);
  }
};

export const loadUserStats = () => {
  try {
    const d = localStorage.getItem(STATS_KEY);
    return d
      ? JSON.parse(d)
      : { lastLoginDate: '', currentStreak: 0, longestStreak: 0 };
  } catch (e) {
    console.error(e);
    return { lastLoginDate: '', currentStreak: 0, longestStreak: 0 };
  }
};

export const saveUserStats = (s) => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
  } catch (e) {
    console.error(e);
  }
};

export const updateStreak = () => {
  const stats = loadUserStats();
  const today = new Date().toISOString().slice(0, 10);
  if (stats.lastLoginDate === today) return stats;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const ys = yesterday.toISOString().slice(0, 10);

  let newStats;
  if (stats.lastLoginDate === ys) {
    const cs = stats.currentStreak + 1;
    newStats = {
      lastLoginDate: today,
      currentStreak: cs,
      longestStreak: Math.max(cs, stats.longestStreak)
    };
  } else if (!stats.lastLoginDate) {
    newStats = {
      lastLoginDate: today,
      currentStreak: 1,
      longestStreak: 1
    };
  } else {
    newStats = {
      lastLoginDate: today,
      currentStreak: 1,
      longestStreak: stats.longestStreak
    };
  }

  saveUserStats(newStats);
  return newStats;
};

// 💾 XP и достижения, сохраняющиеся навсегда
export const loadUserProgress = () => {
  try {
    const d = localStorage.getItem(PROGRESS_KEY);
    return d
      ? JSON.parse(d)
      : { achievements: [], totalXp: 0 };
  } catch (e) {
    console.error(e);
    return { achievements: [], totalXp: 0 };
  }
};

export const saveUserProgress = (progress) => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error(e);
  }
};
