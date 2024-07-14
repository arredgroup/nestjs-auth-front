"use client"
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import AuthService from "@/services/AuthService";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (AuthService.logOut(token)) {
            router.push('/users');
        }else {
            router.push('/login');
        }
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/users');
        }else{
            router.push('/login');
        }
    }, []);

    return (
        <Container maxWidth="sm">
            <div className={"navigator"}>
              <Button id="iniciar-sesion" onClick={() => router.push('/login')}>Iniciar Sesión</Button>
            </div>
        </Container>
      );
}
