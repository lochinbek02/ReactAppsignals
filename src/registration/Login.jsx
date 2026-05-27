import React, { useState } from 'react';
import apiClient from '../api';
import './Login.css'
const Login = ({ message, setMessage, setIsAuthenticated,setIsSuperAdmin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/api/login/', {
                username,
                password
            });

            // Tokenlarni localStoragega saqlash
            localStorage.setItem('access', response.data.access);
            if (response.data.refresh) {
                localStorage.setItem('refresh', response.data.refresh);
            }

            // Superuser yoki staff ekanligini tekshirish
            const isSuperuser = response.data.is_superuser;  // True bo'lsa superuser
            const isStaff = response.data.is_staff;          // True bo'lsa oddiy admin

            if (isSuperuser) {
                setMessage('Super Admin login successful!');
                setIsSuperAdmin(true);
                localStorage.setItem('isSuperAdmin', 'true');
            } else if (isStaff) {
                setMessage('Staff Admin login successful!');
                setIsSuperAdmin(false);
                localStorage.setItem('isSuperAdmin', 'false');
            } else {
                setMessage('Login successful!');
                setIsSuperAdmin(false);
                localStorage.setItem('isSuperAdmin', 'false');
            }

            setIsAuthenticated(true);  // isAuthenticated qiymatini true qilamiz
        } catch (error) {
            setMessage('Login failed');
        }
        setUsername('');
        setPassword('');
    };

    return (
       
            
            <div className="homewrappper">
            <div className="wrapper">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h2 className="form-signin-heading">Please login</h2>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="wrapperbtn wrapperbtn-lg wrapperbtn-primary wrapperbtn-block" type="submit">Login</button>
                    {message && <p className="login-message">{message}</p>}
                </form>
            </div>
            </div>
        
    );
};

export default Login;
