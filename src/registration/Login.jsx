import React, { useState } from 'react';
import axios from 'axios';

const Login = ({message, setMessage, setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });
            // Tokenni localStoragega saqlash
            localStorage.setItem('access', response.data.access);
            setMessage('Login successful!');
            setIsAuthenticated(true);  // Bu yerda isAuthenticated qiymatini true qilamiz
        } catch (error) {
            
            setMessage('Login failed');
        }
        setUsername('')
        setPassword('')
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message}
        </div>
    );
};

export default Login;
