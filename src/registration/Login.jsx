import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
const Login = ({ message, setMessage, setIsAuthenticated,setIsSuperAdmin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://signalpro-production.up.railway.app/api/login/', {
                username,
                password
            });
            
            // Tokenlarni localStoragega saqlash
            localStorage.setItem('access', response.data.access);
            
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
            <div class="wrapper" >
                <form class="form-signin" onSubmit={handleSubmit}>
                    <h2 class="form-signin-heading">Please login</h2>
                    <input type="text" class="form-control" name="username" placeholder="Email Address"  autofocus="" 
                    
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required/>
                    <input type="password" class="form-control" name="password" placeholder="Password" 
                    
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                    {/* <label class="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                    </label> */}
                    <button class="wrapperbtn wrapperbtn-lg wrapperbtn-primary wrapperbtn-block" type="submit">Login</button>
                    {/* {message} */}
                </form>
            </div>
             
            </div>
        
    );
};

export default Login;
