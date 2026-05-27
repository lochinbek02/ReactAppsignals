import { useState } from 'react';
import apiClient from '../api';
import './Login.css';

function Login({ message, setMessage, setIsAuthenticated, setIsSuperAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data } = await apiClient.post('/api/login/', { username, password });

      localStorage.setItem('access', data.access);
      if (data.refresh) {
        localStorage.setItem('refresh', data.refresh);
      }

      const isSuper = Boolean(data.is_superuser);
      const isStaff = Boolean(data.is_staff);
      const isAdmin = isSuper || isStaff;

      setIsSuperAdmin(isAdmin);
      localStorage.setItem('isSuperAdmin', isAdmin ? 'true' : 'false');

      setMessage(
        isSuper
          ? 'Super Admin sifatida kirdingiz'
          : isStaff
          ? 'Admin sifatida kirdingiz'
          : 'Tizimga muvaffaqiyatli kirdingiz'
      );
      setIsAuthenticated(true);
    } catch (error) {
      setMessage('Login muvaffaqiyatsiz. Username/parolni tekshiring.');
    } finally {
      setLoading(false);
      setPassword('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-shape login-bg-shape-1" aria-hidden="true" />
      <div className="login-bg-shape login-bg-shape-2" aria-hidden="true" />
      <div className="login-bg-shape login-bg-shape-3" aria-hidden="true" />

      <div className="login-card fade-in-up">
        <div className="login-brand">
          <div className="login-logo">🧠</div>
          <h1 className="login-title">Biosignal</h1>
          <p className="login-subtitle">EMG signallarini tahlil qilish platformasi</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">Foydalanuvchi nomi</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? (
              <span className="login-loader">
                <span className="login-loader-dot" />
                <span className="login-loader-dot" />
                <span className="login-loader-dot" />
              </span>
            ) : (
              'Tizimga kirish'
            )}
          </button>

          {message && (
            <p className={`login-message ${message.includes('muvaffaqiyatsiz') ? 'is-error' : 'is-success'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
