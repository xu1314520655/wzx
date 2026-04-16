import { useUser } from '../context/UserContext';
import { achievements } from '../data';
import { Lock, Unlock } from 'lucide-react';

export default function AchievementGrid() {
  const { user } = useUser();

  const unlockedIds = new Set(user.unlockedAchievements);

  return (
    <div className="achievement-grid">
      {achievements.map(achievement => {
        const isUnlocked = unlockedIds.has(achievement.id);
        return (
          <div key={achievement.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-info">
              <h4 className="achievement-title">{achievement.title}</h4>
              <p className="achievement-desc">{achievement.description}</p>
              <div className="achievement-meta">
                <span className="achievement-category">{achievement.category}</span>
                <span className="achievement-points">+{achievement.points}积分</span>
              </div>
            </div>
            <div className="achievement-status">
              {isUnlocked ? (
                <Unlock size={18} style={{ color: '#10B981' }} />
              ) : (
                <Lock size={18} style={{ color: '#94A3B8' }} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
