import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';

const AuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {user,setUser} = useContext(AppContext);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const dp = searchParams.get('dp');
        if(token) {
            const userData = {token,name,email,dp};
            localStorage.setItem('currUser',JSON.stringify(userData));
            setUser(userData)
            // console.log(userData);
            toast.success('Logged in Successfully!');
            navigate('/dashboard');
        }else{
            toast.error('Login Failed');
            navigate('/');
        }
    }, [navigate, location.search]);
    return (
        <div className='min-h-screen min-w-full flex items-center justify-center'>
            <div className='text-3xl'>Loading....</div>
        </div>
    );
}

export default AuthRedirect;