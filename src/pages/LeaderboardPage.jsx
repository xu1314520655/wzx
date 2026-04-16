import { leaderboardData } from '../data';
import { useUser } from '../context/UserContext';

export default function LeaderboardPage() {
  const { user } = useUser();

  // Merge current user into leaderboard
  const currentLevel = Math.floor(user.points / 100) + 1;
  const currentUserEntry = {
    rank: null,
    name: user.nickname,
    avatar: user.avatar,
    level: currentLevel,
    points: user.points,
    courses: 0,
    isCurrentUser: true,
  };

  const allEntries = [...leaderboardData, currentUserEntry]
    .sort((a, b) => b.points - a.points)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const topThree = allEntries.slice(0, 3);
  const restEntries = allEntries.slice(3);

  const rankClasses = ['first', 'second', 'third'];
  const rankBadges = ['🥇', '🥈', '🥉'];

  return (
    <div className="page leaderboard-page">
      <div className="page-content">
        <div className="leaderboard-container">
          <div className="page-header">
            <h1>学习排行榜</h1>
            <p>与同学们比拼学习成果，共同进步</p>
          </div>

          {/* 前三名特殊展示 */}
          <div className="top-three">
            {topThree.map((player, index) => (
              <div key={player.name} className={`top-player ${rankClasses[index]}`}>
                <div className="top-player-card">
                  <div className="top-rank-badge">{rankBadges[index]}</div>
                  <div className="top-player-avatar">{player.avatar}</div>
                  <div className="top-player-name">
                    {player.name}
                    {player.isCurrentUser && (
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--primary)',
                        marginLeft: '4px',
                      }}>(我)</span>
                    )}
                  </div>
                  <div className="top-player-points">{player.points.toLocaleString()} 积分</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                    Lv.{player.level}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 排行榜表格 */}
          <div className="leaderboard-table">
            <div className="leaderboard-table-header">
              <span>排名</span>
              <span>学习者</span>
              <span>等级</span>
              <span>积分</span>
            </div>
            {restEntries.map(player => (
              <div
                key={player.name}
                className={`leaderboard-table-row ${player.isCurrentUser ? 'current-user' : ''}`}
              >
                <span className="rank-cell">#{player.rank}</span>
                <div className="player-cell">
                  <span className="player-avatar">{player.avatar}</span>
                  <span className="player-name">
                    {player.name}
                    {player.isCurrentUser && (
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--primary)',
                        marginLeft: '4px',
                      }}>(我)</span>
                    )}
                  </span>
                </div>
                <span className="level-cell">Lv.{player.level}</span>
                <span className="points-cell">{player.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
