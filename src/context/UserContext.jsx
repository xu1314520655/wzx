import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const DEFAULT_AVATARS = ['😊', '🧑‍💻', '👩‍🎓', '👨‍🔬', '🦊', '🐱', '🦁', '🐼', '🦄', '🐸'];

const DEFAULT_USER = {
  nickname: '学习者',
  avatar: '😊',
  joinDate: new Date().toISOString(),
  level: 1,
  points: 0,
  completedLessons: [],
  quizScores: [],
  unlockedAchievements: [],
  streak: 0,
  lastStudyDate: null,
  totalStudyDays: 0,
  totalCodeLines: 0,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dataedu-user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem('dataedu-user', JSON.stringify(user));
  }, [user]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (user.lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = user.lastStudyDate === yesterday ? user.streak + 1 : 1;
      const newStudyDays = user.lastStudyDate !== today ? user.totalStudyDays + 1 : user.totalStudyDays;
      setUser(prev => ({
        ...prev,
        streak: newStreak,
        lastStudyDate: today,
        totalStudyDays: newStudyDays,
      }));
    }
  };

  const completeLesson = (courseId, lessonId) => {
    const key = `${courseId}-${lessonId}`;
    if (!user.completedLessons.includes(key)) {
      setUser(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, key],
        points: prev.points + 10,
      }));
      updateStreak();
    }
  };

  const saveQuizScore = (courseId, quizId, score, total) => {
    const record = { courseId, quizId, score, total, date: new Date().toISOString() };
    const points = Math.round((score / total) * 50);
    setUser(prev => ({
      ...prev,
      quizScores: [record, ...prev.quizScores].slice(0, 50),
      points: prev.points + points,
    }));
    updateStreak();
    if (score === total) {
      unlockAchievement('perfect_quiz');
    }
  };

  const unlockAchievement = (achievementId) => {
    if (!user.unlockedAchievements.includes(achievementId)) {
      setUser(prev => ({
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, achievementId],
      }));
    }
  };

  const addCodeLines = (lines) => {
    setUser(prev => ({
      ...prev,
      totalCodeLines: prev.totalCodeLines + lines,
    }));
  };

  const getLessonProgress = (courseId, totalLessons) => {
    const completed = user.completedLessons.filter(l => l.startsWith(`${courseId}-`)).length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  };

  const isLessonCompleted = (courseId, lessonId) => {
    return user.completedLessons.includes(`${courseId}-${lessonId}`);
  };

  const login = (nickname, avatar) => {
    setUser(prev => ({ ...prev, nickname, avatar, joinDate: prev.joinDate || new Date().toISOString() }));
    unlockAchievement('first_login');
  };

  const resetProgress = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem('dataedu-user');
  };

  const getLevel = () => {
    return Math.floor(user.points / 100) + 1;
  };

  const getNextLevelPoints = () => {
    const level = getLevel();
    return level * 100;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        completeLesson,
        saveQuizScore,
        unlockAchievement,
        addCodeLines,
        getLessonProgress,
        isLessonCompleted,
        resetProgress,
        getLevel,
        getNextLevelPoints,
        DEFAULT_AVATARS,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
