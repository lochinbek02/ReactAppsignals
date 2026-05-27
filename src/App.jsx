import React, { useEffect, useState } from 'react';
import Login from './registration/Login';
import apiClient from './api';
import Main from './components/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preprocess from './components/plot/Preprocess';
import TimeField from './components/plot/TimeField';
import Frequency from './components/plot/Frequency';
import Navbar from './components/navbar/Navbar';
import Classification from './components/plot/Classification';
import Results from './components/plot/Results';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuperAdmin,setIsSuperAdmin]=useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    const superAdminStatus = localStorage.getItem('isSuperAdmin');
    if (token) {
      apiClient.get('/api/some_protected_route/')
        .then(() => {
          setIsAuthenticated(true);
          setMessage('Welcome back!');
          setIsSuperAdmin(superAdminStatus === 'true');
        })
        .catch(() => {
          localStorage.removeItem('access');
          localStorage.removeItem('isSuperAdmin');
          setIsAuthenticated(false);
          setMessage('Session expired. Please login again.');
        });
    }
  }, [isAuthenticated]);
  
  console.log(isSuperAdmin)
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('isSuperAdmin');
    setIsAuthenticated(false);
    setMessage('Logged out.');
  };

  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <>
          <Navbar setIsAuthenticated={setIsAuthenticated} isSuperAdmin={isSuperAdmin}/> 
          <Routes>
            
            
            <Route path="/" element={<Main message={message} handleLogout={handleLogout} />} />
            {isSuperAdmin && <Route path="/classification" element={<Classification />} />}
            <Route path="/resultsClassification" element={<Results />} />
            <Route path="/preprocess" element={<Preprocess />} />
            <Route path="/timefield" element={<TimeField />} />
            <Route path="/frequency" element={<Frequency />} />

          </Routes>

          </>
         
        ) : (
          <Login message={message} setMessage={setMessage} setIsAuthenticated={setIsAuthenticated} setIsSuperAdmin={setIsSuperAdmin} />
        )}
      </div>
    </Router>
  );
};

export default App;
