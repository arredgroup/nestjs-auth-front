import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const result = await AuthService.logOut(token);
            if (result) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
            }
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {user?.name || 'Guest'}
                </Typography>
                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;


