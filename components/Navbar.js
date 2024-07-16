"use client";
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "" });

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className="navbar">
            <div className="navbar-item">
                {user?.name ? `Hola, ${user.name}` : ''}
            </div>
            <div className="navbar-item">
                <Button onClick={() => router.push('/')}>
                    Inicio
                </Button>
                <Button onClick={() => router.push('/bulk-create')}>
                    Crear Usuarios
                </Button>
                <Button onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    );
}

export default Navbar;

