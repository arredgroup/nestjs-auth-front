"use client"
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import AuthService from "@/services/AuthService";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        //Comprobación de token expiración
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            console.log('No hay usuario');
            router.push('/login');
        }else{
        
        const expirationTime = new Date(user.expiration);
        const currentTime = new Date();
        
        if (currentTime >= expirationTime) {
                console.log('El token ha expirado');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                router.push('/login');
                return;
        }
    }
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
