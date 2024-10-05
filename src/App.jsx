import React, { useEffect, useState } from 'react';
import Login from './registration/Login';
import axios from 'axios';
import Main from './components/Main'
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');

    // useEffect tokenni har safar isAuthenticated o'zgarganda tekshiradi
    useEffect(() => {
        const token = localStorage.getItem('access');
        
        if (token) {
            // Tokenni tekshirish uchun API so‘rov yuborish
            axios.get('http://localhost:8000/api/some_protected_route/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                // Agar token to'g'ri bo'lsa, foydalanuvchini autentifikatsiya qilish
                setIsAuthenticated(true);
                setMessage('Welcome back!');
            })
            .catch(() => {
                // Agar token noto'g'ri bo'lsa, uni o'chirib tashlang
                localStorage.removeItem('access');
                setIsAuthenticated(false);
                
                setMessage('Session expired. Please login again.');
            });
        }
    }, [isAuthenticated]); // isAuthenticated o'zgarganda qayta ishlaydi

    const handleLogout = () => {
        // Foydalanuvchini chiqish uchun
        localStorage.removeItem('access');
        setIsAuthenticated(false);
        setMessage('Logged out.');
    };

    return (
        <div>
            {/* <h1>{isAuthenticated ? <Main/> : 'Login' }</h1> */}
            {isAuthenticated ? (
                <div>
                    <Main message={message} handleLogout={handleLogout}/>
                    
                    {/* <button onClick={handleLogout}>Logout</button> */}
                </div>
            ) : (
                <Login message={message} setMessage={setMessage} setIsAuthenticated={setIsAuthenticated} />
            )}
        </div>
    );
};

export default App;
