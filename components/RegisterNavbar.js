"use client";
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

const RegisterNavbar = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "" });

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const result = await AuthService.logOut(token);
        if(result){
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            router.push('/login');
        }
    }

    return (
        <div className="navbar">
            <div className="navbar-item">
                {user?.name ? `Hola, ${user.name}` : ''}
            </div>
            <div className="navbar-item">
                <Button onClick={() => router.push('/register')}>
                    Inicio
                </Button>
                <Button onClick={() => router.push('/users')}>
                    Lista de Usuarios
                </Button>
                <Button onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
                
            </div>
        </div>
    );
}

export default RegisterNavbar;
