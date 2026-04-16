import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('😊');
  const [error, setError] = useState('');
  const { login, DEFAULT_AVATARS } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('请输入你的昵称');
      return;
    }
    if (nickname.trim().length > 12) {
      setError('昵称不能超过12个字符');
      return;
    }
    login(nickname.trim(), selectedAvatar);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon">📊</div>
          <h1>欢迎来到 DataEdu Pro</h1>
          <p>设置你的学习档案，开始数据分析之旅</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickname">你的昵称</label>
            <input
              id="nickname"
              type="text"
              placeholder="输入你的昵称..."
              value={nickname}
              onChange={e => { setNickname(e.target.value); setError(''); }}
              maxLength={12}
              autoFocus
            />
            {error && (
              <span style={{ color: 'var(--error)', fontSize: '0.8125rem', marginTop: '4px' }}>
                {error}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>选择你的头像</label>
            <div className="avatar-selector">
              {DEFAULT_AVATARS.map(avatar => (
                <button
                  key={avatar}
                  type="button"
                  className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>预览你的档案</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '2rem' }}>{selectedAvatar}</span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>
                  {nickname || '你的昵称'}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                  Lv.1 · 数据分析新手
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg login-submit">
            开始学习之旅
          </button>
        </form>
      </div>
    </div>
  );
}
