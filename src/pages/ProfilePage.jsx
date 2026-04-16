import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { courses } from '../data';
import { achievements } from '../data';
import { Sun, Moon, RotateCcw, BookOpen, Calendar, Zap, Trophy } from 'lucide-react';

export default function ProfilePage() {
  const { user, getLevel, getNextLevelPoints, resetProgress } = useUser();
  const { theme, toggleTheme } = useTheme();

  const level = getLevel();
  const nextLevelPoints = getNextLevelPoints();
  const currentLevelProgress = user.points % 100;

  const unlockedAchievements = achievements.filter(a =>
    user.unlockedAchievements.includes(a.id)
  );

  const recentAchievements = unlockedAchievements.slice(-4).reverse();

  const handleReset = () => {
    if (window.confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
      resetProgress();
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* 用户信息卡片 */}
        <div className="profile-header-card">
          <div className="profile-avatar">{user.avatar}</div>
          <div className="profile-info">
            <h1>{user.nickname}</h1>
            <div className="profile-level">
              <Zap size={14} />
              等级 {level}
            </div>
            <div style={{ marginTop: '8px' }}>
              <div className="progress-bar" style={{ width: '200px', height: '6px' }}>
                <div className="progress-fill" style={{ width: `${currentLevelProgress}%` }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                距离下一等级还需 {100 - currentLevelProgress} 积分
              </p>
            </div>
            <p className="profile-join-date">
              加入于 {user.joinDate ? new Date(user.joinDate).toLocaleDateString('zh-CN') : '今天'}
            </p>
          </div>
        </div>

        {/* 学习统计 */}
        <div className="profile-stats-grid">
          <div className="profile-stat-card">
            <div className="profile-stat-value">{user.completedLessons.length}</div>
            <div className="profile-stat-label">
              <BookOpen size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              已完成课时
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{user.totalStudyDays}</div>
            <div className="profile-stat-label">
              <Calendar size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              学习天数
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{user.points}</div>
            <div className="profile-stat-label">
              <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              获得积分
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{user.unlockedAchievements.length}</div>
            <div className="profile-stat-label">
              <Trophy size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              解锁成就
            </div>
          </div>
        </div>

        {/* 学习进度 */}
        <div className="profile-section">
          <h2>学习进度</h2>
          {courses.map(course => {
            const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
            const progress = user.completedLessons.filter(l => l.startsWith(`${course.id}-`)).length;
            const percent = totalLessons > 0 ? Math.round((progress / totalLessons) * 100) : 0;
            return (
              <div key={course.id} className="course-progress-item">
                <div className="course-progress-icon">{course.icon}</div>
                <div className="course-progress-info">
                  <div className="course-progress-name">{course.title}</div>
                  <div className="course-progress-bar">
                    <div className="course-progress-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>
                <div className="course-progress-percent">{percent}%</div>
              </div>
            );
          })}
        </div>

        {/* 最近成就 */}
        <div className="profile-section">
          <h2>最近成就</h2>
          {recentAchievements.length > 0 ? (
            <div className="achievement-list">
              {recentAchievements.map(achievement => (
                <div key={achievement.id} className="achievement-mini">
                  <span className="achievement-mini-icon">{achievement.icon}</span>
                  <span className="achievement-mini-title">{achievement.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9375rem' }}>
              还没有解锁任何成就，开始学习来获取第一个成就吧！
            </p>
          )}
        </div>

        {/* 测评历史 */}
        <div className="profile-section">
          <h2>测评历史</h2>
          {user.quizScores.length > 0 ? (
            user.quizScores.slice(0, 5).map((record, index) => (
              <div key={index} className="quiz-history-item">
                <div>
                  <span style={{ fontWeight: 500 }}>测验 #{index + 1}</span>
                  <span className="quiz-history-date" style={{ marginLeft: '12px' }}>
                    {new Date(record.date).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <span className="quiz-history-score">
                  {record.score} / {record.total}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9375rem' }}>
              还没有测验记录，完成课程中的测验来查看成绩。
            </p>
          )}
        </div>

        {/* 设置区域 */}
        <div className="profile-section">
          <h2>设置</h2>
          <div className="profile-settings">
            <div className="setting-item">
              <label>
                {theme === 'light' ? '☀️ 亮色模式' : '🌙 暗色模式'}
              </label>
              <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                切换主题
              </button>
            </div>
            <div className="setting-item">
              <label>重置学习进度</label>
              <button className="btn btn-danger btn-sm" onClick={handleReset}>
                <RotateCcw size={14} /> 重置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
