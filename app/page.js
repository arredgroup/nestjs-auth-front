"use client"
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import UserList from '../components/UserList';
import BulkCreateUsers from '../components/BulkCreateUsers';
import Login from '../components/Login';

export default function Home() {
    const router = useRouter();
    const [token, setToken] = useState(localStorage.getItem('authToken') || '');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/users');
        }
    }, [router]);

    const handleLogin = (newToken) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
    };

    return (
        <Container maxWidth="sm">
            <div className={"navigator"}>
                {!token ? (
                    <Login onLogin={handleLogin} />
                ) : (
                    <div>
                        <UserList />
                        <BulkCreateUsers />
                    </div>
                )}
                <Button id="iniciar-sesion" onClick={() => router.push('/login')}>Iniciar Sesión</Button>
            </div>
        </Container>
    );
}
