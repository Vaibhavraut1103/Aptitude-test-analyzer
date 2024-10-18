import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function withAuth(WrappedComponent) {
    return function AuthComponent() {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:5500/api/v1/auth/check-session',{ withCredentials: true });
                    if (response.data.isAuthenticated) {
                        setLoading(false);
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('Error checking authentication:', error);
                    navigate('/login');
                }
            };

            checkAuth();
        }, []);

        return loading ? <div>Loading...</div> : <WrappedComponent />;
    };
}

export default withAuth;
