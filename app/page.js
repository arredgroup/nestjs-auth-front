"use client"
import React from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const user = localStorage.getItem('user');
    if (user) {
        router.push('/users');
    }

    return (
        <Container maxWidth="sm">
            <div className={"navigator"}>
              <Button id="iniciar-sesion" onClick={() => router.push('/login')}>Iniciar Sesión</Button>
            </div>
        </Container>
      );
}
