import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Trophy, BarChart3, User, Menu, X, Sun, Moon, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: '首页', icon: <GraduationCap size={18} /> },
    { path: '/courses', label: '课程中心', icon: <BookOpen size={18} /> },
    { path: '/achievements', label: '成就殿堂', icon: <Trophy size={18} /> },
    { path: '/leaderboard', label: '排行榜', icon: <BarChart3 size={18} /> },
    { path: '/profile', label: '个人中心', icon: <User size={18} /> },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">DataEdu Pro</span>
        </Link>

        <nav className={`header-nav ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} title={theme === 'light' ? '切换暗色模式' : '切换亮色模式'}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/profile" className="user-avatar-btn" title="个人中心">
            <span className="user-avatar">{user.avatar}</span>
          </Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
