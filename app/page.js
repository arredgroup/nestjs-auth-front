'use client';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/users');
        }
    }, []);

    return (
        <Container maxWidth="sm">
            <div className={"navigator"}>
                <Button id="iniciar-sesion" onClick={() => router.push('/login')}>Iniciar Sesión</Button>
                <Button id="users" onClick={() => router.push('/users')}>User List</Button>
                <Button id="bulk-create-users" onClick={() => router.push('/bulk-create-users')}>Bulk Create Users</Button>
            </div>
        </Container>
    );
}
