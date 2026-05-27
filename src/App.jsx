import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './registration/Login';
import apiClient from './api';
import Navbar from './components/navbar/Navbar';
import Main from './components/Main';
import Preprocess from './components/plot/Preprocess';
import TimeField from './components/plot/TimeField';
import Frequency from './components/plot/Frequency';
import Classification from './components/plot/Classification';
import Results from './components/plot/Results';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Verify the access token on initial load
  useEffect(() => {
    const token = localStorage.getItem('access');
    const superAdminStatus = localStorage.getItem('isSuperAdmin');

    if (!token) {
      setCheckingAuth(false);
      return;
    }

    apiClient
      .get('/api/some_protected_route/')
      .then(() => {
        setIsAuthenticated(true);
        setIsSuperAdmin(superAdminStatus === 'true');
        setMessage('');
      })
      .catch(() => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('isSuperAdmin');
        setIsAuthenticated(false);
        setMessage('Sessiya tugadi. Iltimos, qayta kiring.');
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  // Listen for forced logout (e.g. when refresh-token flow fails in api.js)
  useEffect(() => {
    const handleAuthLogout = () => {
      setIsAuthenticated(false);
      setIsSuperAdmin(false);
      setMessage('Sessiya tugadi. Iltimos, qayta kiring.');
    };
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, []);

  if (checkingAuth) {
    return (
      <div className="app-loading" role="status" aria-live="polite">
        <div className="app-loading-spinner" />
        <span className="sr-only">Yuklanmoqda...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Login
        message={message}
        setMessage={setMessage}
        setIsAuthenticated={setIsAuthenticated}
        setIsSuperAdmin={setIsSuperAdmin}
      />
    );
  }

  return (
    <Router>
      <Navbar setIsAuthenticated={setIsAuthenticated} isSuperAdmin={isSuperAdmin} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/timefield" element={<TimeField />} />
        <Route path="/preprocess" element={<Preprocess />} />
        <Route path="/frequency" element={<Frequency />} />
        {isSuperAdmin ? (
          <>
            <Route path="/classification" element={<Classification />} />
            <Route path="/resultsClassification" element={<Results />} />
          </>
        ) : (
          <>
            <Route path="/classification" element={<Navigate to="/" replace />} />
            <Route path="/resultsClassification" element={<Navigate to="/" replace />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
