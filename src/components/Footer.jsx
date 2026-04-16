import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">📊</span>
              <span className="logo-text">DataEdu Pro</span>
            </div>
            <p className="footer-desc">
              面向商务数据分析与应用专业学生的在线学习平台，通过互动式学习体验，助你掌握Python数据分析技能。
            </p>
          </div>

          <div className="footer-section">
            <h4>学习资源</h4>
            <ul>
              <li><Link to="/courses">全部课程</Link></li>
              <li><Link to="/achievements">成就系统</Link></li>
              <li><Link to="/leaderboard">学习排行</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>学习路径</h4>
            <ul>
              <li><Link to="/courses">Python基础</Link></li>
              <li><Link to="/courses">数据处理</Link></li>
              <li><Link to="/courses">数据可视化</Link></li>
              <li><Link to="/courses">统计分析</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>关于平台</h4>
            <ul>
              <li><span>使用帮助</span></li>
              <li><span>反馈建议</span></li>
              <li><span>更新日志</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', color: '#EF4444' }} />
            {' '}DataEdu Pro - Python数据分析在线教育平台
          </p>
        </div>
      </div>
    </footer>
  );
}
