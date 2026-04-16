import { useUser } from '../context/UserContext';
import { achievements } from '../data';
import AchievementGrid from '../components/AchievementGrid';

export default function AchievementsPage() {
  const { user, getLevel } = useUser();
  const level = getLevel();
  const unlockedCount = user.unlockedAchievements.length;
  const totalCount = achievements.length;
  const totalUnlockedPoints = achievements
    .filter(a => user.unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="page achievements-page">
      <div className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>成就殿堂</h1>
            <p>记录你的每一次进步与突破</p>
          </div>

          {/* 总积分和等级展示 */}
          <div className="achievements-summary">
            <div className="summary-item">
              <div className="summary-value">{user.points}</div>
              <div className="summary-label">总积分</div>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <div className="summary-value">Lv.{level}</div>
              <div className="summary-label">当前等级</div>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <div className="summary-value">{unlockedCount}/{totalCount}</div>
              <div className="summary-label">已解锁成就</div>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <div className="summary-value">{totalUnlockedPoints}</div>
              <div className="summary-label">成就积分</div>
            </div>
          </div>

          {/* 成就统计信息 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}>
            {['入门', '学习', '实践', '测验', '坚持', '排名'].map(category => {
              const categoryAchievements = achievements.filter(a => a.category === category);
              const unlockedInCategory = categoryAchievements.filter(a =>
                user.unlockedAchievements.includes(a.id)
              ).length;
              return (
                <div key={category} style={{
                  padding: '8px 16px',
                  background: 'var(--card)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                }}>
                  {category}：{unlockedInCategory}/{categoryAchievements.length}
                </div>
              );
            })}
          </div>

          {/* 成就网格 */}
          <AchievementGrid />
        </div>
      </div>
    </div>
  );
}
