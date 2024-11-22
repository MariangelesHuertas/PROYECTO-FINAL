import React, { useEffect } from 'react';

const GoogleCallback = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const id_user = urlParams.get('id_user');
        if (token && id_user) {
            localStorage.setItem('token', token);
            localStorage.setItem('id_usuario', id_user);
            console.log("token ->", token ,"--",id_user);
            window.location.href = 'http://localhost:3000/employment/recommendations';
        } else {
            console.error('No token found in URL');
        }
    }, []);

    return <div>Loading...</div>;
};

export default GoogleCallback;


